# 💼 Tarea Extraclase de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## Gestión de una Bolsa de Empleo (Job Board)

**Duración:** 15 semanas
**Modalidad:** Desarrollo por equipos – Proyecto Django funcional

---

## 🏢 Contexto General

El proyecto **"JobFinder"** es una bolsa de empleo a pequeña escala diseñada para conectar a pequeñas empresas con posibles candidatos. El sistema debe permitir a las empresas publicar ofertas de trabajo y a los candidatos postularse a ellas. Los objetivos principales son:

- **Registrar y gestionar** ofertas de trabajo.
- **Permitir a los candidatos** postularse a las ofertas.
- **Visualizar y gestionar** las postulaciones de cada oferta.
- **Facilitar la comunicación** entre empresas y candidatos.

El sistema debe manejar las siguientes categorías de trabajo:

- 💻 Desarrollo de Software
- 📊 Marketing Digital
- 🎨 Diseño Gráfico
- ✍️ Redacción de Contenidos

---

## 🔐 Seguridad y Roles

El sistema debe tener un **mecanismo de autenticación** con dos roles:

## 👤 Usuario Empresa (quien publica la oferta)

- Publica y gestiona sus ofertas de trabajo.
- Visualiza las postulaciones que ha recibido para cada oferta.
- Puede contactar a los candidatos a través de la plataforma (simulado con un campo de notas o a través de notificaciones internas).

## 👥 Usuario Candidato (quien busca empleo)

- Visualiza y busca las ofertas de trabajo disponibles.
- Se postula a las ofertas de su interés.
- Visualiza el estado de sus postulaciones (pendiente, revisada, contactado).

**Reglas del negocio:**

1. Una postulación debe estar asociada a un candidato y a una oferta de trabajo.
2. Una empresa solo puede ver las postulaciones a sus propias ofertas.
3. El sistema debe evitar que un candidato se postule más de una vez a la misma oferta de trabajo.

---

### 🛠️ Requisitos Funcionales

## a) 📝 Gestión de Ofertas y Postulaciones

- **Registrar oferta de trabajo:** título, descripción, categoría, empresa, ubicación, fecha de publicación, fecha límite.
- **Administrar postulaciones:** candidato, oferta de trabajo, fecha de postulación, estado (pendiente, revisada, contactado).
- **Notificar al candidato** sobre el estado de su postulación (ej. notificaciones internas de sistema).

  **Reglas del negocio:**

  1. Al postularse, el sistema debe registrar el candidato, la oferta, y la fecha de postulación.
  2. La empresa puede cambiar el estado de una postulación a `revisada` o `contactado`.
  3. Los candidatos solo pueden postularse a ofertas que no hayan expirado.

## b) 📊 Consultas Funcionales (implementa al menos 3)

1. Mostrar la cantidad de ofertas de trabajo activas por categoría.
2. Listar las 5 ofertas de trabajo más recientes.
3. Calcular la cantidad de postulaciones que ha recibido una oferta de trabajo específica.
4. Listar todas las postulaciones de un candidato, ordenadas por fecha.
5. Obtener las ofertas de trabajo que expiran en la próxima semana.

---

## 💻 Componentes de Interfaz (Requeridos)

- Navbar Bootstrap con enlaces a cada sección (Inicio, Ofertas, Mis Postulaciones, Publicar Oferta, Perfil).
- Login y Logout con formularios estilizados.
- Uso de tarjetas (card components) de Bootstrap para mostrar las ofertas de trabajo.
- Tablas Bootstrap para listar postulaciones con su estado.
- Formularios responsivos con Bootstrap 5.

---

## ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite o Postgres SQL

---

## 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de ofertas de trabajo y postulaciones.
- Interfaz limpia y navegable.
- Validaciones requeridas.
- Empleo de formularios en Django.
- Mensajes de acción (e.g., "Postulación enviada con éxito").
- Funciones de consulta implementadas en views.

## 💡 Recomendaciones

- Prioriza la funcionalidad sobre el diseño.
- Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- Apóyate en la documentación oficial (`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.

---

¡Mucho éxito! 💼