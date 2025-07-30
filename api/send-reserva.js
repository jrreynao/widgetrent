import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { form } = req.body;
  if (!form) return res.status(400).json({error: 'Faltan datos'});

  // Leer plantillas desde disco SIEMPRE
  let htmlCliente = '';
  let htmlAdmin = '';
  try {
    htmlCliente = fs.readFileSync(path.join(process.cwd(), 'public', 'email_templates', 'correo_cliente.html'), 'utf8');
    htmlAdmin = fs.readFileSync(path.join(process.cwd(), 'public', 'email_templates', 'correo_admin.html'), 'utf8');
  } catch (e) {
    return res.status(500).json({error: 'No se pudo leer la plantilla de correo'});
  }

  // Reemplazar todas las variables en la plantilla
  function fillTemplate(template, vars) {
    return template.replace(/%([a-zA-Z0-9_]+)%/g, (_, key) => vars[key] || '');
  }

  // ...el resto del código ya construye el objeto vars correctamente y lo usa para reemplazar las variables...

  // Configuración SMTP
  const transporter = nodemailer.createTransport({
    host: 'mail.isracarent.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Utilidad para reemplazar variables en plantilla
  function fillTemplate(template, vars) {
    return template.replace(/%([a-zA-Z0-9_]+)%/g, (_, key) => vars[key] || '');
  }

  // Dirección de entrega para el admin: siempre mostrar la dirección si existe
  let direccionEntrega = form.fechas?.direccionEntrega || form.datos?.direccion || '';
  const mostrarDireccion = form.fechas?.delivery || (form.extras && form.extras.includes("1"));

  const allExtras = form.allExtras && Array.isArray(form.allExtras)
    ? form.allExtras
    : [
        { id: "1", name: "Llevar vehículo a mi dirección", price: 30000 },
        { id: "2", name: "Conductor adicional", price: 6000 },
        { id: "3", name: "GPS", price: 6000 },
        { id: "4", name: "Silla para niño", price: 8000 }
      ];

  let diasAlquiler = form.fechas?.diasAlquiler;
  let fechaInicio = form.fechas?.fechaRetiro || form.fechas?.fechaEntrega;
  let fechaFin = form.fechas?.fechaDevolucion;
  if (!diasAlquiler && fechaInicio && fechaFin) {
    try {
      const d1 = new Date(fechaInicio);
      const d2 = new Date(fechaFin);
      const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      diasAlquiler = diff > 0 ? diff : 1;
    } catch {}
  }

  let tarjeta_credito = 'No';
  if (form.datos && typeof form.datos.tieneTarjeta !== 'undefined' && form.datos.tieneTarjeta !== null) {
    tarjeta_credito = form.datos.tieneTarjeta === true || form.datos.tieneTarjeta === 'si' ? 'Sí' : 'No';
  }

  // Generar bloque HTML para extras con precios (admin)
  let extras_list_block = '';
  if (form.extras && form.extras.length > 0) {
    const extrasSeleccionados = (form.extras || []).map(id => {
      const extra = allExtras.find(e => e.id === id);
      return extra ? extra : null;
    }).filter(Boolean);
    if (extrasSeleccionados.length > 0) {
      extras_list_block = `<div style="margin:18px 0 0 0;padding:0 0 0 0.5em;font-size:1.08em"><b>Servicios extras:</b><ul style="margin:8px 0 0 0;padding:0 0 0 1.2em;">` +
        extrasSeleccionados.map(e => `<li>${e.name} <span style='color:#ff6600;font-weight:600;'>$${parseInt(e.price).toLocaleString('es-AR')}</span></li>`).join('') +
        `</ul></div>`;
    }
  }

  const vars = {
    customer_full_name: form.datos?.nombre || '',
    customer_email: form.datos?.email || '',
    customer_phone: form.datos?.telefono || '',
    dni_number: form.datos?.dni || '',
    customer_note: form.datos?.nota || '',
    service_name: form.vehiculo?.nombre || '',
    service_image: form.vehiculo?.imagen || form.vehiculo?.image || '',
    service_extras: (form.extras || []).map(id => {
      const extra = allExtras.find(e => e.id === id);
      return extra ? (extra.name || extra.nombre || id) : id;
    }).filter(Boolean).join(', ') || 'Sin extras',
    whatsapp_factura: (() => {
      let factura = '🧾 *Resumen de Reserva*%0A';
      factura += `Orden: ${vars.booking_id}%0A`;
      factura += `Nombre: ${form.datos?.nombre || ''}%0A`;
      factura += `Vehículo: ${form.vehiculo?.nombre || ''}%0A`;
      factura += `Fechas: ${vars.appointment_date} a ${vars.fechadev}%0A`;
      factura += 'Extras:%0A';
      if (form.extras && form.extras.length > 0) {
        (form.extras || []).forEach(id => {
          const extra = allExtras.find(e => e.id === id);
          if (extra) factura += `- ${extra.name}: $${parseInt(extra.price).toLocaleString('es-AR')}%0A`;
        });
      } else {
        factura += '- Sin extras%0A';
      }
      factura += `Total: ${vars.appointment_amount} (por ${vars.appointment_duration})%0A%0A`;
      factura += 'Deseo terminar mi proceso de reserva y me gustaría saber los métodos de pago disponibles.';
      return factura;
    })(),
    appointment_date: form.fechas?.fechaRetiro || '',
    fechadev: form.fechas?.fechaDevolucion || '',
    hora_entregadevehiculo: form.fechas?.horaEntrega || form.fechas?.horaRetiro || '',
    hora_devolucionvehiculo: (form.fechas?.horaDevolucion && /am|pm/i.test(form.fechas.horaDevolucion))
      ? form.fechas.horaDevolucion
      : (form.fechas?.horaDevolucion ? form.fechas.horaDevolucion + ' hs' : ''),
    appointment_duration: diasAlquiler ? `${diasAlquiler} días` : '',
    appointment_amount: (() => {
      // Calcular total backend por si frontend no lo envía bien
      let totalVehiculo = 0;
      if (form.vehiculo && form.vehiculo.precio) {
        totalVehiculo = parseInt(form.vehiculo.precio) * (diasAlquiler || 1);
      }
      let totalExtras = 0;
      if (form.extras && Array.isArray(form.extras)) {
        totalExtras = (form.extras || []).map(id => {
          const extra = allExtras.find(e => e.id === id);
          return extra ? parseInt(extra.price) || 0 : 0;
        }).reduce((a,b)=>a+b,0);
      }
      const total = totalVehiculo + totalExtras;
      return total ? `$${Number(total).toLocaleString('es-AR')}` : '';
    })(),
    text_direccionentrega: direccionEntrega ? direccionEntrega : 'Nuestra Agencia.',
    text_direccionentrega_block: mostrarDireccion && direccionEntrega ? `<b>Dirección de entrega:</b> ${direccionEntrega}` : '',
    booking_id: Math.floor(Math.random()*1000000),
    tarjeta_credito,
    // Extraer código de país y número local del teléfono internacional
    customer_whatsapp_link: (() => {
      if (!form.datos?.telefono) return '';
      // El input react-phone-input-2 entrega el número en formato internacional: +<código><número>
      let tel = String(form.datos.telefono).replace(/[^\d]/g, '');
      // Si el número empieza con '00', quitarlo
      if (tel.startsWith('00')) tel = tel.slice(2);
      // Si el número empieza con '549', es Argentina (WhatsApp requiere 549...)
      // Si el número empieza con '54' y el número local tiene 10 dígitos, agregar el 9 después del 54
      if (tel.startsWith('54')) {
        if (tel.startsWith('549')) {
          return tel;
        } else if (tel.length === 12 && tel.startsWith('54')) {
          // Ya tiene 54 y 9
          return tel;
        } else if (tel.length === 11 && tel.startsWith('54')) {
          // Falta el 9 después del 54
          return '549' + tel.slice(2);
        }
      }
      // Para otros países, solo usar el número internacional sin el '+'
      return tel;
    })(),
    extras_list_block
  };

  let mensaje_entrega_cliente = '';
  if (mostrarDireccion && direccionEntrega) {
    mensaje_entrega_cliente = `Hemos coordinado la entrega de tu vehículo en la dirección indicada (<b>${direccionEntrega}</b>) el día de inicio a las <b>${vars.hora_entregadevehiculo}</b>. Si tienes alguna duda o necesitas modificar la dirección, contáctanos.`;
  } else {
    mensaje_entrega_cliente = `Deberás retirar tu vehículo en nuestra agencia. Te esperamos en <a href="https://g.co/kgs/gj5UX3Z" style="color:#2563eb;text-decoration:none;font-weight:500" target="_blank">Av. de los Lagos 7008, B1670 Rincón de Milberg</a> a la hora acordada.`;
  }
  vars.mensaje_entrega_cliente = mensaje_entrega_cliente;

  try {
    const userResult = await transporter.sendMail({
      from: 'IsraCar Rent <admin@isracarent.com>',
      to: vars.customer_email,
      subject: '¡Tu reserva en IsraCar Rent! Finaliza y paga tu alquiler',
      html: fillTemplate(htmlCliente, vars)
    });
    const adminResult = await transporter.sendMail({
      from: 'IsraCar Rent <admin@isracarent.com>',
      to: 'admin@isracarent.com',
      subject: `Nueva solicitud de reserva de ${vars.customer_full_name}`,
      html: fillTemplate(htmlAdmin, vars)
    });
    if (userResult.accepted.length && adminResult.accepted.length) {
      res.json({ok:true});
    } else {
      res.status(500).json({error: 'No se pudo enviar uno o ambos correos'});
    }
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
