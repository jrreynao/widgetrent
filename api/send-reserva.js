
import nodemailer from 'nodemailer';
import { extras as allExtras } from '../src/data/extras.js';
import { fillTemplate } from '../src/utils/loadEmailTemplate.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { form } = req.body;
  if (!form) return res.status(400).json({error: 'Faltan datos'});

  // Configurar transporter de nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Variables necesarias
  // TODO: Asegúrate de definir direccionEntrega, mostrarDireccion, tarjeta_credito, extras_list_block, fillTemplate, htmlCliente, htmlAdmin antes de usar

  // Leer las plantillas de correo HTML
  // Leer las plantillas desde la URL pública
  async function fetchTemplate(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`No se pudo obtener la plantilla: ${url}`);
    return await res.text();
  }
  const htmlCliente = await fetchTemplate('https://widget.isracarent.com/email_templates/correo_cliente.html');
  const htmlAdmin = await fetchTemplate('https://widget.isracarent.com/email_templates/correo_admin.html');
  const booking_id = Math.floor(Math.random()*1000000);
  const customer_full_name = form.datos?.nombre || '';
  const customer_email = form.datos?.email || '';
  const customer_phone = form.datos?.telefono || '';
  const dni_number = form.datos?.dni || '';
  const customer_note = form.datos?.nota || '';
  const service_name = form.vehiculo?.nombre || '';
  const service_image = form.vehiculo?.imagen || form.vehiculo?.image || '';
  const service_extras = (form.extras || []).map(id => {
    const extra = allExtras?.find(e => e.id === id);
    return extra ? (extra.name || extra.nombre || id) : id;
  }).filter(Boolean).join(', ') || 'Sin extras';
  const appointment_date = form.fechas?.fechaRetiro || '';
  const fechadev = form.fechas?.fechaDevolucion || '';
  const hora_entregadevehiculo = form.fechas?.horaEntrega || form.fechas?.horaRetiro || '';
  const hora_devolucionvehiculo = (form.fechas?.horaDevolucion && /am|pm/i.test(form.fechas.horaDevolucion))
    ? form.fechas.horaDevolucion
    : (form.fechas?.horaDevolucion ? form.fechas.horaDevolucion + ' hs' : '');

  // Calcular diasAlquiler
  let diasAlquiler = 1;
  if (form.fechas?.fechaRetiro && form.fechas?.fechaDevolucion) {
    const d1 = new Date(form.fechas.fechaRetiro);
    const d2 = new Date(form.fechas.fechaDevolucion);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    diasAlquiler = diff > 0 ? diff : 1;
  }

  const appointment_duration = `${diasAlquiler} días`;
  const appointment_amount = (() => {
    let totalVehiculo = 0;
    if (form.vehiculo && form.vehiculo.precio) {
      totalVehiculo = parseInt(form.vehiculo.precio) * diasAlquiler;
    }
    let totalExtras = 0;
    if (form.extras && Array.isArray(form.extras)) {
      totalExtras = (form.extras || []).map(id => {
        const extra = allExtras?.find(e => e.id === id);
        return extra ? parseInt(extra.price) || 0 : 0;
      }).reduce((a,b)=>a+b,0);
    }
    const total = totalVehiculo + totalExtras;
    return total ? `$${Number(total).toLocaleString('es-AR')}` : '';
  })();
  const text_direccionentrega = typeof direccionEntrega !== 'undefined' && direccionEntrega ? direccionEntrega : 'Nuestra Agencia.';
  const text_direccionentrega_block = typeof mostrarDireccion !== 'undefined' && mostrarDireccion && direccionEntrega ? `<b>Dirección de entrega:</b> ${direccionEntrega}` : '';
  const tarjeta_credito_var = typeof tarjeta_credito !== 'undefined' ? tarjeta_credito : '';
  const customer_whatsapp_link = (() => {
    if (!form.datos?.telefono) return '';
    let tel = String(form.datos.telefono).replace(/[^0-9]/g, '');
    if (tel.startsWith('00')) tel = tel.slice(2);
    if (tel.startsWith('54')) {
      if (tel.startsWith('549')) {
        return tel;
      } else if (tel.length === 12 && tel.startsWith('54')) {
        return tel;
      } else if (tel.length === 11 && tel.startsWith('54')) {
        return '549' + tel.slice(2);
      }
    }
    return tel;
  })();
  const whatsapp_factura = (() => {
    let factura = '🧾 *Resumen de Reserva*%0A';
    factura += `Orden: ${booking_id}%0A`;
    factura += `Nombre: ${customer_full_name}%0A`;
    factura += `Vehículo: ${service_name}%0A`;
    factura += `Fechas: ${appointment_date} a ${fechadev}%0A`;
    factura += 'Extras:%0A';
    if (form.extras && form.extras.length > 0) {
      (form.extras || []).forEach(id => {
        const extra = allExtras?.find(e => e.id === id);
        if (extra) factura += `- ${extra.name}: $${parseInt(extra.price).toLocaleString('es-AR')}%0A`;
      });
    } else {
      factura += '- Sin extras%0A';
    }
    factura += `Total: ${appointment_amount} (por ${appointment_duration})%0A%0A`;
    factura += 'Deseo terminar mi proceso de reserva y me gustaría saber los métodos de pago disponibles.';
    return factura;
  })();
  const vars = {
    customer_full_name,
    customer_email,
    customer_phone,
    dni_number,
    customer_note,
    service_name,
    service_image,
    service_extras,
    appointment_date,
    fechadev,
    hora_entregadevehiculo,
    hora_devolucionvehiculo,
    appointment_duration,
    appointment_amount,
    text_direccionentrega,
    text_direccionentrega_block,
    booking_id,
    tarjeta_credito: tarjeta_credito_var,
    customer_whatsapp_link,
    extras_list_block: typeof extras_list_block !== 'undefined' ? extras_list_block : '',
    whatsapp_factura
  };

  let mensaje_entrega_cliente = '';
  if (typeof mostrarDireccion !== 'undefined' && mostrarDireccion && direccionEntrega) {
    mensaje_entrega_cliente = `Hemos coordinado la entrega de tu vehículo en la dirección indicada (<b>${direccionEntrega}</b>) el día de inicio a las <b>${hora_entregadevehiculo}</b>. Si tienes alguna duda o necesitas modificar la dirección, contáctanos.`;
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
    console.error('Error en send-reserva:', e);
    res.status(500).json({error: e.message, stack: e.stack});
  }
}
