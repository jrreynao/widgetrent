# Estructura Adaptada para Flutter: Widget de Renta de Autos y Panel Administrativo

## Frontend: Widget Flutter
- El widget se desarrolla en Flutter, permitiendo integración en aplicaciones móviles y web.
- La interfaz utiliza componentes como `Form`, `DropdownButton`, `DatePicker`, y `Stepper` para guiar al usuario por los pasos de reserva.
- Los pasos incluyen:
  1. Selección de fechas (con validación y calendario)
  2. Selección de categoría de vehículo (Económico, SUV, Premium)
  3. Selección de extras (con precios)
  4. Ingreso de datos del cliente (nombre, email, teléfono, etc.)
  5. Confirmación de reserva
- Validaciones se implementan con `FormField` y lógica en Dart.
- El widget envía la solicitud de reserva al backend mediante HTTP (usando `http` o `dio`).

## Backend: API REST
- El backend expone endpoints REST para recibir reservas, consultar vehículos, gestionar inventario y enviar correos.
- Ejemplo de endpoints:
  - `POST /reservas`: Recibe la solicitud de reserva
  - `GET /vehiculos?categoria=...`: Devuelve vehículos disponibles por categoría
  - `POST /respuesta`: Permite al admin responder al cliente con vehículos disponibles
  - `GET /reservas/calendario`: Devuelve rangos de fechas de reservas para el dashboard
- El backend puede estar en Node.js, Python, o Dart (con `shelf` o `aqueduct`).

## Panel Administrativo Flutter
- El panel se desarrolla como una app Flutter (web o móvil) para administradores.
- Incluye:
  - Dashboard con calendario (usando `TableCalendar` o similar)
  - Gestión de inventario de vehículos (CRUD)
  - Visualización y respuesta a solicitudes de reserva
  - Filtros por categoría, estado y fechas
  - Envío de correos al cliente (integración con backend SMTP)
- El calendario muestra rangos de días rentados por vehículo, con colores y etiquetas.
- Al responder una solicitud, el admin puede seleccionar vehículos y enviar la respuesta desde la app.

## Base de Datos
- Se recomienda usar una base SQL (PostgreSQL, MySQL, SQLite) accesible desde el backend.
- Tablas sugeridas:
  - `vehiculos`: id, categoria, marca, modelo, año, estado, etc.
  - `reservas`: id, cliente, fechas, categoria, estado, vehiculo_id
  - `extras`: id, nombre, precio
  - `usuarios`: id, nombre, email, rol

## Integraciones
- **Correo SMTP**: El backend gestiona el envío de correos usando Nodemailer, SMTP, o paquete equivalente en Dart.
- **Notificaciones Push**: Integración con OneSignal usando el paquete Flutter correspondiente.
- **Chatbot WhatsApp**: El backend puede integrar la API de WhatsApp Business para responder y enviar información desde el panel.

## Ejemplo de Flujo Flutter
1. Usuario abre el widget y completa los pasos de reserva.
2. El widget envía la solicitud al backend.
3. El admin recibe la solicitud en el panel Flutter, consulta el inventario y responde con vehículos disponibles.
4. El cliente recibe la respuesta por correo y puede confirmar la reserva.
5. El dashboard muestra el calendario actualizado con las reservas.

---

## Estructura y Conexión del Backend - Rent a Car Widget

## 1. Archivos Principales

- **sendReserva.js / sendReserva.cjs**
  - Recibe los datos del formulario desde el frontend (por HTTP POST).
  - Valida los datos recibidos (sucursal, fechas, horas, datos del cliente).
  - Usa plantillas HTML para generar el contenido de los correos.
  - Envía correos de confirmación al cliente y al administrador usando SMTP.
  - Responde al frontend con el estado de la operación (éxito/error).

- **testSmtp.js / testSmtp.cjs**
  - Permite probar la configuración SMTP para asegurar que los correos se envían correctamente.
  - Utiliza los mismos parámetros de conexión SMTP que el archivo principal.

- **email_templates/**
  - `correo_cliente.html`: Plantilla para el correo de confirmación al cliente.
  - `correo_admin.html`: Plantilla para el correo de notificación al administrador.

## 2. Flujo de Conexión

1. **Recepción de Datos**
   - El frontend envía los datos de la reserva mediante una petición HTTP (fetch/AJAX) al endpoint gestionado por `sendReserva.js`.

2. **Procesamiento**
   - El backend valida los datos recibidos.
   - Si los datos son válidos, genera el contenido de los correos usando las plantillas HTML.

3. **Envío de Correos**
   - Se conecta al servidor SMTP configurado (puede ser Gmail, Outlook, etc.).
   - Envía un correo al cliente con los detalles de la reserva.
   - Envía un correo al administrador con la información de la nueva reserva.

4. **Respuesta al Frontend**
   - El backend responde al frontend con un mensaje de éxito o error.
   - El frontend muestra el resultado al usuario.

## 3. Conexión y Configuración

- **Configuración SMTP:**
  - Los archivos usan variables de entorno o parámetros configurados para el host, puerto, usuario y contraseña del servidor SMTP.
  - Se recomienda no dejar credenciales sensibles en el código fuente.

- **Plantillas HTML:**
  - Las plantillas permiten personalizar el contenido y el diseño de los correos.
  - Se pueden modificar para agregar branding, información adicional, etc.

## 4. Extensibilidad

- El backend puede conectarse a una base de datos para guardar las reservas.
- Puede integrarse con APIs externas (por ejemplo, sistemas de gestión de flotas).
- Se pueden agregar validaciones adicionales y lógica de negocio según necesidades.

## 5. Diagrama Simplificado

```
[Frontend Widget] --(HTTP POST)--> [sendReserva.js] --(SMTP)--> [Cliente]
                                             |--(SMTP)--> [Administrador]
```

## 6. Configuración SMTP Real del Proyecto

En este proyecto se usa la siguiente configuración SMTP para enviar correos:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.isracarent.com',      // Servidor SMTP real
  port: 465,                       // Puerto SSL
  secure: true,                    // Usar SSL
  auth: {
    user: 'info@isracarent.com',   // Usuario SMTP
    pass: 'Israwordpress1.'        // Clave SMTP
  },
  tls: {
    rejectUnauthorized: false
  }
});
```

- **host:** mail.isracarent.com
- **port:** 465
- **user:** info@isracarent.com
- **pass:** Israwordpress1.

Esta configuración se usa tanto en `sendReserva.cjs` como en `testSmtp.cjs` para enviar y verificar correos.

> **Nota:** Para producción, se recomienda usar variables de entorno y no dejar la clave en el código fuente.

---

## 7. Funciones y Flujo Específico del Frontend (Widget)

Este widget está diseñado para ser embebido en otras webs y sigue el siguiente flujo de pasos:

### Orden y Detalle de los Pasos

1. **Selección de Fechas y Sucursal**
   - Componente: `StepFechas.jsx`
   - **Campos del formulario:**
     - Sucursal de retiro: input de texto, ícono de ubicación, valor por defecto "Buenos Aires".
     - Fecha de recogida: input de fecha, ícono de calendario, valor por defecto: día siguiente a la fecha actual.
     - Hora de recogida: input de hora, ícono de reloj, valor por defecto: "08:00".
     - Fecha de devolución: input de fecha, ícono de calendario, valor por defecto: vacío (el usuario debe seleccionar).
     - Hora de devolución: input de hora, ícono de reloj, valor por defecto: "14:00".
   - Los campos usan íconos para mejorar la experiencia visual y están alineados en una sola fila en escritorio.
   - El formulario valida que las fechas sean correctas y que todos los campos estén completos antes de avanzar.
   - El usuario no puede modificar la sucursal (campo deshabilitado por defecto).

2. **Selección de Categoría de Vehículo**
   - Componente: `StepVehiculo.jsx`
   - El cliente ya no selecciona un vehículo exacto, sino una **categoría**:
     - Vehículo pequeño
     - Vehículo mediano
     - Vehículo grande
   - Cada categoría muestra:
     - Un ejemplo visual de un vehículo representativo de la categoría (imagen, nombre, características).
     - Un rango de precio aproximado para esa categoría (por ejemplo: $30-$40/día).
   - El usuario selecciona la categoría que mejor se adapta a sus necesidades.
   - El resumen de la reserva mostrará el precio aproximado según la categoría elegida, no un precio final exacto.
   - La lógica de backend puede asignar el vehículo exacto al momento de confirmar la reserva.

3. **Selección de Extras**
   - Componente: `StepExtras.jsx`
   - El usuario puede agregar los siguientes extras opcionales:
     - Llevar vehículo a mi dirección: $30,000
     - Conductor adicional: $6,000
     - GPS: $6,000
     - Silla para niño: $8,000
   - Cada extra tiene un precio fijo y se suma al total de la reserva.
   - El usuario puede seleccionar uno o varios extras según sus necesidades.

4. **Datos del Cliente**
   - Componente: `StepDatos.jsx`
   - Los datos que se obtienen del cliente son:
     - Nombre y Apellido
     - Email
     - Teléfono (con código de país)
     - N° DNI o Pasaporte
     - Dirección (solo si selecciona el extra "Llevar vehículo a mi dirección")
     - ¿Posee tarjeta de crédito? (Sí/No, obligatorio)
     - Nota (campo opcional para comentarios adicionales)
   - Todos los campos son validados antes de avanzar al siguiente paso.

5. **Confirmación de Reserva**
   - Componente: `StepConfirmar.jsx`
   - Se muestra un resumen completo de la reserva: fechas, vehículo, extras, datos del cliente y precio total.
   - El usuario puede revisar y confirmar la información antes de enviar.
   - Al confirmar, se envía la reserva al backend mediante una petición HTTP.
   - El backend procesa la reserva y envía correos de confirmación.
   - El widget muestra el resultado (éxito/error) y puede mostrar un mensaje final o redirigir al usuario.

### Lógica y Conexión

- Cada paso está conectado mediante el estado global del widget (por ejemplo, usando React Context o props).
- El avance entre pasos depende de la validación de los datos ingresados en cada uno.
- El diseño es responsivo y se adapta a escritorio y móvil.
- El widget puede ser personalizado y embebido en cualquier web.

---


## Validaciones y Conexión al Backend en Cada Paso (Flutter)

### 1. Selección de Fechas y Sucursal
- **Validaciones:**
  - Sucursal: campo deshabilitado, valor fijo (usando `TextFormField` con `enabled: false`).
  - Fecha de recogida: debe ser posterior a la fecha actual (validación en Dart).
  - Hora de recogida: formato válido (`TimeOfDay`).
  - Fecha de devolución: debe ser posterior a la fecha de recogida.
  - Hora de devolución: formato válido (`TimeOfDay`).
  - Todos los campos deben estar completos para avanzar (validación con `Form` y `GlobalKey<FormState>`).
- **Conexión al backend:**
  - Los datos seleccionados se guardan en el estado global del widget (usando `Provider`, `Bloc` o similar).
  - Se envían al backend junto con los datos de los siguientes pasos al confirmar la reserva usando HTTP (`http` o `dio`).

### 2. Selección de Categoría de Vehículo
- **Validaciones:**
  - El usuario debe seleccionar una categoría (pequeño, mediano, grande).
  - Se muestra un ejemplo visual y rango de precio.
  - No se puede avanzar sin elegir una categoría.
- **Conexión al backend:**
  - La categoría seleccionada se guarda en el estado global.
  - El backend recibe la categoría y asigna el vehículo exacto al confirmar la reserva.

### 3. Selección de Extras
- **Validaciones:**
  - Los extras son opcionales, pero si se selecciona "Llevar vehículo a mi dirección", el campo dirección en el paso de datos será obligatorio.
  - El precio total se actualiza en tiempo real según los extras seleccionados (usando lógica en Dart).
- **Conexión al backend:**
  - Los extras seleccionados se envían junto con el resto de los datos al backend.
  - El backend incluye los extras en el correo de confirmación y en el cálculo del precio.

### 4. Datos del Cliente
- **Validaciones:**
  - Nombre y Apellido: obligatorio.
  - Email: formato válido y obligatorio (validación con RegExp en Dart).
  - Teléfono: formato internacional y obligatorio.
  - DNI o Pasaporte: obligatorio.
  - Dirección: obligatorio solo si se seleccionó el extra correspondiente.
  - ¿Posee tarjeta de crédito?: obligatorio (Sí/No).
  - Nota: opcional.
  - Se muestran mensajes de error si falta información o el formato es incorrecto (usando `FormField` y validadores en Dart).
- **Conexión al backend:**
  - Todos los datos del cliente se envían al backend al confirmar la reserva.
  - El backend los usa para generar los correos y procesar la reserva.

### 5. Confirmación de Reserva
- **Validaciones:**
  - Se muestra un resumen de todos los datos ingresados y seleccionados.
  - El usuario debe revisar y confirmar la información.
  - No se puede enviar la reserva si falta algún dato obligatorio.
- **Conexión al backend:**
  - Al confirmar, el widget envía todos los datos (fechas, sucursal, categoría, extras, datos del cliente) al backend mediante una petición HTTP POST.
  - El backend procesa la reserva, envía los correos y responde con el estado (éxito/error).
  - El widget muestra el resultado y puede mostrar un mensaje final o redirigir al usuario.

---

## Panel Administrativo y Conexión a Base de Datos SQL

Para ampliar el proyecto, se puede agregar un **panel administrativo** conectado a una base de datos SQL (por ejemplo, MySQL, PostgreSQL, SQL Server) con las siguientes funcionalidades:

### 1. Estructura y Conexión
- El backend se conecta a una base de datos SQL donde se almacenan:
  - Datos de los clientes
  - Reservas realizadas
  - Historial de pagos y respuestas
- Se recomienda usar un ORM como Sequelize o TypeORM para facilitar la gestión de datos.

### 2. Funcionalidades del Panel
- **Visualización de reservas:**
  - Listado de todas las reservas con filtros por fecha, estado, sucursal, etc.
  - Detalle de cada reserva: fechas, cliente, vehículo/categoría, extras, precio, estado.
- **Gestión de clientes:**
  - Acceso a los datos completos del cliente (nombre, email, teléfono, dirección, etc.).
  - Historial de reservas por cliente.
- **Respuesta y gestión de reservas:**
  - Posibilidad de responder a una reserva (aprobada, rechazada, pendiente de pago, etc.).
  - Envío de links de pago personalizados al cliente (por email o WhatsApp).
  - Actualización del estado de la reserva en la base de datos.
- **Notificaciones y seguimiento:**
  - Registro de todas las interacciones y respuestas enviadas.
  - Notificaciones internas para el equipo administrativo.

### 3. Flujo de Conexión
- El widget envía los datos de la reserva al backend.
- El backend guarda la reserva y los datos del cliente en la base de datos SQL.
- El panel administrativo consulta la base de datos para mostrar y gestionar la información.
- Las acciones del panel (responder, enviar link de pago, actualizar estado) se reflejan en la base de datos y pueden disparar correos/notificaciones al cliente.

### 4. Seguridad y Acceso
- El panel debe requerir autenticación para el acceso administrativo.
- Los datos sensibles deben estar protegidos y las acciones auditadas.

---

## Integración de Chatbot de WhatsApp en el Panel Administrativo

### 1. Configuración y Conexión
- El panel administrativo permite **configurar un chatbot de WhatsApp**:
  - El administrador escanea el QR de WhatsApp Web para conectar el número.
  - Una vez conectado, el panel muestra el estado de la conexión y los chats activos.
  - Hay un botón para activar o desactivar el chatbot en cualquier momento.

### 2. Lógica del Chatbot
- El chatbot responde automáticamente a los mensajes de los clientes siguiendo un **flujo por pasos**:
  1. Saludo y explicación del proceso de reserva.
  2. Solicita fechas y sucursal de retiro.
  3. Solicita categoría de vehículo (pequeño, mediano, grande).
  4. Solicita extras opcionales.
  5. Solicita datos del cliente (nombre, email, teléfono, DNI, etc.).
  6. Muestra resumen y solicita confirmación.
  7. Al confirmar, envía la reserva al backend igual que el widget web.
- Cada paso valida la respuesta del cliente y no avanza hasta recibir datos válidos.
- Si el cliente se equivoca, el bot repite la pregunta y da ejemplos claros.
- El bot puede enviar mensajes de ayuda y aclaraciones en cualquier paso.

### 3. Conexión al Widget y Backend
- Las reservas hechas por WhatsApp se procesan igual que las del widget:
  - El bot envía los datos al backend por HTTP POST.
  - El backend envía los correos de confirmación al cliente y al administrador.
  - La reserva se guarda en la base de datos y aparece en el panel administrativo.

### 4. Monitoreo y Control
- El panel muestra los chats activos y el historial de conversaciones.
- El administrador puede ver las respuestas del bot y del cliente en tiempo real.
- Se puede intervenir manualmente en cualquier chat si es necesario.
- El estado del bot (activo/inactivo) se controla desde el panel.

### 5. Seguridad y Privacidad
- Solo usuarios autenticados pueden acceder a la configuración y monitoreo del chatbot.
- Los datos de los clientes y las conversaciones se almacenan de forma segura.

---

## Notificaciones Push con OneSignal

- El proyecto integra **OneSignal** para el envío de notificaciones push tanto en el panel administrativo como en el widget.
- **Usos principales:**
  - Notificar al equipo administrativo sobre nuevas reservas, pagos recibidos, mensajes del chatbot, errores, etc.
  - Notificar a los clientes sobre el estado de su reserva, confirmaciones, links de pago, recordatorios, etc.
- **Lógica de integración:**
  - El backend envía notificaciones a OneSignal mediante su API REST cuando ocurre un evento relevante.
  - El frontend (panel y widget) recibe y muestra las notificaciones en tiempo real.
  - Los usuarios pueden gestionar sus preferencias de notificación desde el panel.
- **Ventajas:**
  - Notificaciones multiplataforma (web, móvil, escritorio).
  - Segmentación por usuario, tipo de evento y estado.
  - Historial y registro de notificaciones enviadas.

---

Este documento resume cómo está estructurado y conectado el backend del proyecto. Si necesitas el código de ejemplo de cada archivo, puedo generarlo también.

---

## Estructura Detallada del Panel Administrativo

### 1. Acceso y Autenticación
- **Login:**
  - Formulario de acceso con usuario y contraseña.
  - Validación de credenciales contra la base de datos SQL.
  - Soporte para recuperación de contraseña y cambio de clave.
  - Opcional: autenticación de dos factores (2FA) para mayor seguridad.
- **Gestión de usuarios:**
  - Roles: administrador, operador, solo lectura, etc.
  - Permisos granulares para cada módulo y acción.

### 2. Módulos Principales

#### a) Dashboard
- Resumen de actividad: reservas recientes, clientes nuevos, estado del chatbot, links de pago enviados, etc.
- Gráficos y estadísticas de reservas por fecha, sucursal, categoría, etc.

#### b) Reservas
- Listado de todas las reservas con filtros avanzados (fecha, estado, sucursal, cliente, etc.).
- Detalle de cada reserva: fechas, cliente, categoría, extras, precio, estado, historial de cambios.
- Acciones: aprobar, rechazar, marcar como pagada, enviar link de pago, responder al cliente.

#### c) Clientes
- Listado de clientes con búsqueda y filtros.
- Detalle de cada cliente: datos personales, historial de reservas, interacciones.
- Edición y actualización de datos del cliente.

#### d) Chatbot WhatsApp
- Estado de conexión (activo/inactivo).
- Escaneo QR para conectar WhatsApp.
- Listado y monitoreo de chats activos.
- Visualización de conversaciones y respuestas automáticas.
- Botón para activar/desactivar el bot.
- Intervención manual en chats si es necesario.

#### e) Links de Pago
- Generación y envío de links de pago personalizados.
- Estado de pagos (pendiente, pagado, vencido).
- Historial de links enviados y pagos recibidos.

#### f) Notificaciones y Seguimiento
- Registro de todas las acciones administrativas y notificaciones enviadas.
- Alertas internas para el equipo (nueva reserva, pago recibido, error en envío de correo, etc.).

### 3. Seguridad y Auditoría
- Acceso solo para usuarios autenticados y autorizados.
- Registro de todas las acciones (quién hizo qué y cuándo).
- Protección de datos sensibles y cumplimiento de normativas (GDPR, etc.).

### 4. Conexión y Sincronización
- Todos los módulos están conectados a la base de datos SQL y al backend del widget.
- Cambios realizados en el panel (respuestas, pagos, edición de datos) se reflejan en tiempo real en la base de datos y pueden disparar correos/notificaciones.
- El panel puede integrarse con APIs externas (pasarelas de pago, sistemas de gestión, etc.).

---

## Panel Administrativo: Control y Respuesta de Vehículos Disponibles

### Control de Vehículos Disponibles
- El panel administrativo incluye una sección para gestionar el inventario de vehículos de la empresa.
- Los administradores pueden agregar, editar, eliminar y actualizar el estado de cada vehículo (disponible, reservado, en mantenimiento, etc.).
- Cada vehículo está asociado a una categoría (Económico, SUV, Premium) y tiene atributos como marca, modelo, año, color, placa, y observaciones.
- El inventario se almacena en la base de datos SQL y se actualiza en tiempo real.

### Respuesta a Solicitudes de Reserva
- Cuando un cliente realiza una solicitud de reserva desde el widget, esta aparece en el panel administrativo.
- El administrador puede ver la categoría seleccionada por el cliente y consultar los vehículos disponibles en esa categoría.
- Desde el panel, el administrador puede responder la solicitud enviando al cliente una lista de los vehículos disponibles en la categoría elegida.
- La respuesta se envía por correo electrónico (usando la integración SMTP) y puede incluir detalles, fotos y características de los vehículos.
- El sistema permite seleccionar uno o varios vehículos para sugerir al cliente, facilitando la comunicación y la gestión de reservas.

### Flujo de Trabajo
1. Cliente realiza solicitud de reserva y selecciona una categoría.
2. Solicitud aparece en el panel administrativo con todos los datos del cliente y la categoría elegida.
3. El administrador consulta el inventario de vehículos disponibles en esa categoría.
4. El administrador responde al cliente desde el panel, enviando la lista de vehículos disponibles.
5. El cliente recibe la información y puede confirmar la reserva de un vehículo específico.
6. El estado del vehículo se actualiza automáticamente en el inventario (reservado/no disponible).

### Integración Técnica
- El inventario de vehículos se gestiona mediante una tabla SQL (por ejemplo, `vehiculos`) con los campos mencionados.
- El panel administrativo incluye formularios y vistas para gestionar el inventario y responder solicitudes.
- La lógica de respuesta utiliza la integración SMTP para enviar correos personalizados.
- Se recomienda implementar endpoints REST para consultar y actualizar el inventario y las reservas.

---

### Dashboard con Calendario de Reservas
- El panel administrativo incluye un dashboard principal con un calendario interactivo.
- En el calendario se visualizan los rangos de días en que cada vehículo está rentado, reservado o disponible.
- Cada vehículo tiene su propio color o etiqueta para facilitar la identificación en el calendario.
- El calendario permite filtrar por categoría, estado del vehículo, y fechas específicas.
- Al hacer clic en un vehículo o en un rango de fechas, se muestra información detallada de la reserva: cliente, fechas, estado, y opciones para modificar o cancelar la reserva.
- El calendario se actualiza en tiempo real al crear, modificar o cancelar reservas.

#### Integración Técnica
- El calendario obtiene los datos de la base de datos SQL, consultando las reservas y el estado de los vehículos.
- Se recomienda usar una librería de calendario como FullCalendar en el frontend del panel administrativo para la visualización.
- Endpoints REST permiten consultar reservas por vehículo y rango de fechas, así como actualizar el estado de las reservas.

---
