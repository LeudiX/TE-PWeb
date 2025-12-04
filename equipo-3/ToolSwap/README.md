# 🛠️ Tarea Extraclase de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## Gestión de Plataforma de Alquiler de Herramientas P2P

**Duración:** 15 semanas
**Modalidad:** Desarrollo por equipos – Proyecto Django funcional

---

## 🧰 Contexto General

El proyecto **"ToolSwap"** es una plataforma de alquiler entre pares que permite a los usuarios prestar y alquilar herramientas de forma segura y sencilla. La plataforma debe ser capaz de:

- **Registrar herramientas** para ser alquiladas.
- **Gestionar solicitudes de alquiler** de herramientas.
- Permitir la **búsqueda y visualización de herramientas** disponibles.
- **Calificar a los usuarios** después de un alquiler.

La plataforma debe manejar las siguientes categorías de herramientas comunes:

- 🔨 Herramientas de mano (martillos, destornilladores)
- ⚙️ Herramientas eléctricas (taladros, sierras)
- 🪴 Herramientas de jardín (palas, podadoras)
- 🚗 Herramientas de automóvil (llaves inglesas, gatos hidráulicos)

---

## 🔐 Seguridad y Roles

El sistema debe tener un **mecanismo de autenticación** con dos roles:

## 👤 Usuario Proveedor (quien presta la herramienta)

- Registra y gestiona sus herramientas en alquiler.
- Recibe y gestiona las solicitudes de alquiler de otros usuarios.
- Califica a los usuarios que alquilaron sus herramientas.

## 👥 Usuario Cliente (quien alquila la herramienta)

- Visualiza el listado de herramientas disponibles.
- Envía solicitudes de alquiler.
- Visualiza el historial de sus alquileres y el estado de las solicitudes.
- Califica a los proveedores de herramientas.

**Reglas del negocio:**

1. Una herramienta puede tener solo una solicitud de alquiler pendiente a la vez.
2. Un usuario puede tener múltiples herramientas en alquiler.
3. El estado de la solicitud de alquiler debe cambiar automáticamente (e.g., de 'Pendiente' a 'Alquilado') una vez que el proveedor la apruebe.

---

### 🛠️ Requisitos Funcionales

## a) 🔨 Gestión de Herramientas, Solicitudes y Calificaciones

- **Registrar herramienta:** nombre, categoría, descripción, precio por día, disponible (sí/no), foto (opcional).
- **Administrar solicitudes de alquiler:** herramienta, usuario solicitante, fecha de inicio, fecha de fin, estado (pendiente, aprobado, rechazado), acción (aprobar/denegar).
- **Registrar calificación:** usuario calificador, usuario calificado, puntuación (1-5), comentario.

  **Reglas del negocio:**

  1. Si la solicitud de alquiler es aprobada, la herramienta debe cambiar su estado a `disponible: no`.
  2. Si la solicitud es denegada o cancelada, la herramienta debe volver a estar `disponible: sí`.
  3. Las calificaciones solo se pueden registrar una vez que el alquiler ha finalizado.

## b) 📊 Consultas Funcionales

1. Mostrar las 5 herramientas más solicitadas en el último mes.
2. Listar las herramientas disponibles para alquilar, ordenadas por precio (del más bajo al más alto).
3. Calcular la calificación promedio de un usuario proveedor.
4. Listar todas las herramientas de una categoría específica con una calificación promedio superior a 4 estrellas.
5. Obtener el historial de alquiler de un usuario cliente, ordenado cronológicamente.

---

## 💻 Componentes de Interfaz (Requeridos)

- Navbar Bootstrap con enlaces a cada sección (Inicio, Explorar Herramientas, Mis Herramientas, Solicitudes, Perfil).
- Login y Logout con formularios estilizados.
- Uso de tarjetas (card components) de Bootstrap para mostrar las herramientas.
- Formularios responsivos con Bootstrap 5 para el registro y gestión.

---

## ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite o Postgres SQL

---

## 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de herramientas, solicitudes y calificaciones.
- Interfaz limpia y navegable.
- Validaciones requeridas.
- Empleo de formularios en Django.
- Mensajes de acción (e.g., "Solicitud aprobada con éxito").
- Funciones de consulta implementadas en views.

## 💡 Recomendaciones

- Prioriza la funcionalidad sobre el diseño.
- Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- Apóyate en la documentación oficial (`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.

---

¡Mucho éxito! 🛠️