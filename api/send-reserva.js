import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { form, htmlCliente, htmlAdmin } = req.body;
  if (!form || !htmlCliente || !htmlAdmin) return res.status(400).json({error: 'Faltan datos'});

  // Configuración SMTP
  const transporter = nodemailer.createTransport({
    host: 'mail.isracarent.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@isracarent.com',
      pass: 'Israwordpress1.'
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
    appointment_date: form.fechas?.fechaEntrega || '',
    fechadev: form.fechas?.fechaDevolucion || '',
    hora_entregadevehiculo: form.fechas?.horaEntrega || form.fechas?.horaRetiro || '',
    hora_devolucionvehiculo: form.fechas?.horaDevolucion || '',
    appointment_duration: diasAlquiler ? `${diasAlquiler} días` : '',
    appointment_amount: form.total ? `$${Number(form.total).toLocaleString('es-AR')}` : '',
    text_direccionentrega: direccionEntrega ? direccionEntrega : 'Nuestra Agencia.',
    text_direccionentrega_block: mostrarDireccion && direccionEntrega ? `<b>Dirección de entrega:</b> ${direccionEntrega}` : '',
    booking_id: Math.floor(Math.random()*1000000),
    tarjeta_credito
  };

  let mensaje_entrega_cliente = '';
  if (mostrarDireccion && direccionEntrega) {
    mensaje_entrega_cliente = `Hemos coordinado la entrega de tu vehículo en la dirección indicada (<b>${direccionEntrega}</b>) el día de inicio a las <b>${vars.hora_entregadevehiculo}</b>. Si tienes alguna duda o necesitas modificar la dirección, contáctanos.`;
  } else {
    mensaje_entrega_cliente = `Deberás retirar tu vehículo en nuestra agencia. Te esperamos en <a href="https://g.co/kgs/gj5UX3Z" style="color:#2563eb;text-decoration:none;font-weight:500" target="_blank">Av. de los Lagos 7008, B1670 Rincón de Milberg</a> a la hora acordada.`;
  }
  vars.mensaje_entrega_cliente = mensaje_entrega_cliente;

  try {
    await transporter.sendMail({
      from: 'IsraCar Rent <admin@isracarent.com>',
      to: vars.customer_email,
      subject: '¡Tu reserva en IsraCar Rent! Finaliza y paga tu alquiler',
      html: fillTemplate(htmlCliente, vars)
    });
    await transporter.sendMail({
      from: 'IsraCar Rent <admin@isracarent.com>',
      to: 'admin@isracarent.com',
      subject: `Nueva solicitud de reserva de ${vars.customer_full_name}`,
      html: fillTemplate(htmlAdmin, vars)
    });
    res.json({ok:true});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
