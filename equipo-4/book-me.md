# 🗓️ Tarea Extraclase de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## Gestión de Sistema de Reservas de Citas

**Duración:** 15 semanas
**Modalidad:** Desarrollo por equipos – Proyecto Django funcional

---

## ✂️ Contexto General

El proyecto **"BookMeNow"** es un sistema de gestión de citas para un pequeño negocio de servicios de belleza. El objetivo es que los clientes puedan reservar citas de manera fácil y que el negocio pueda gestionar su calendario de forma eficiente. El sistema debe:

- **Gestionar servicios** ofrecidos y su duración.
- **Permitir a los clientes** reservar citas.
- **Visualizar la disponibilidad** de los empleados o del negocio.
- **Administrar las citas** aprobando, rechazando o cancelando.

El sistema debe manejar los siguientes tipos de servicios (ejemplo para una peluquería):

- 💇‍♂️ Corte de cabello
- 🎨 Tinte
- 💅 Manicura
- 💆‍♀️ Masaje capilar

---

## 🔐 Seguridad y Roles

El sistema debe tener un **mecanismo de autenticación** con dos roles:

## 👤 Usuario Administrador (dueño del negocio)

- Gestiona los servicios y la disponibilidad de los empleados.
- Visualiza el calendario de citas y las aprueba o rechaza.
- Cancela citas si es necesario.

## 👥 Usuario Cliente (quien reserva la cita)

- Visualiza los servicios disponibles.
- Reserva una cita en una fecha y hora disponible.
- Visualiza el estado de su cita (pendiente, confirmada, rechazada).

**Reglas del negocio:**

1. Una cita debe estar asociada a un servicio y a un cliente.
2. Un cliente no puede reservar dos citas a la misma hora.
3. El administrador puede definir la duración de cada servicio para que el sistema calcule los horarios disponibles automáticamente.

---

### 🛠️ Requisitos Funcionales

## a) 📅 Gestión de Servicios y Citas

- **Registrar servicio:** nombre, descripción, duración (en minutos), precio.
- **Administrar citas:** cliente, servicio, fecha, hora, estado (pendiente, confirmada, rechazada).
- **Notificar al cliente** sistema de notificaciones internas o por correo electrónico para actualizarlo sobre el estado de su cita.

  **Reglas del negocio:**

  1. El sistema debe validar que la fecha y hora seleccionadas por el cliente no estén ya reservadas.
  2. Al aprobar una cita, el sistema debe cambiar su estado a `confirmada` y el horario debe dejar de estar disponible para otros clientes.

## b) 📊 Consultas Funcionales

1. Mostrar la cantidad de citas confirmadas para la semana actual.
2. Listar todas las citas pendientes de aprobación.
3. Calcular la duración total de los servicios reservados para un día específico.
4. Mostrar los servicios más populares (con mayor cantidad de reservas).
5. Listar las citas de un cliente específico, ordenadas por fecha.

---

## 💻 Componentes de Interfaz (Requeridos)

- Navbar Bootstrap con enlaces a cada sección (Inicio, Servicios, Reservar Cita, Mis Citas, Administración).
- Login y Logout con formularios estilizados.
- Uso de un calendario interactivo (librería JS simple) o un selector de fecha para facilitar la reserva.
- Formularios responsivos con Bootstrap 5.

---

## ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite o Postgres SQL

---

## 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de servicios y citas.
- Interfaz limpia y navegable.
- Validaciones requeridas.
- Empleo de formularios en Django.
- Mensajes de acción (e.g., "Cita confirmada").
- Funciones de consulta implementadas en views.

## 💡 Recomendaciones

- Prioriza la funcionalidad sobre el diseño.
- Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- Apóyate en la documentación oficial (`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.

---

¡Mucho éxito! 🗓️