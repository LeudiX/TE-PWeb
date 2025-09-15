# 📦 Tarea Extraclase de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## Gestión de Inventario para Pequeña Tienda

**Duración:** 15 semanas
**Modalidad:** Desarrollo por equipos – Proyecto Django funcional

---

## 🛍️ Contexto General

El proyecto **"StockWatch"** es un sistema de gestión de inventario para una pequeña tienda minorista. El objetivo es proporcionar una herramienta simple para que el dueño del negocio pueda llevar un control de sus productos y el stock disponible. El sistema debe ser capaz de:

- **Registrar y categorizar** productos.
- **Gestionar las entradas y salidas** de stock.
- **Generar alertas** para productos con bajo inventario.
- **Visualizar el inventario** de forma clara.

El sistema debe manejar las siguientes categorías de productos (ejemplo para una tienda de electrónica):

- 💻 Computadoras
- 📱 Teléfonos móviles
- 🎧 Auriculares
- 🖱️ Periféricos (mouse, teclado)

---

## 🔐 Seguridad y Roles

El sistema debe tener un **mecanismo de autenticación** con un solo rol:

## 👤 Usuario Administrador (dueño del negocio)

- Gestiona los productos: puede agregar, editar, o eliminar productos.
- Registra las entradas y salidas de stock.
- Visualiza el estado actual del inventario y las alertas.

**Reglas del negocio:**

1. Cada producto debe estar asociado a una categoría.
2. La cantidad de stock de un producto no puede ser negativa.
3. El sistema debe calcular automáticamente el stock disponible después de cada transacción (entrada o salida).

---

### 🛠️ Requisitos Funcionales

## a) 📦 Gestión de Productos y Stock

- **Registrar producto:** nombre, descripción, categoría, precio, stock inicial.
- **Registrar entrada de stock:** producto, cantidad añadida, fecha.
- **Registrar salida de stock:** producto, cantidad vendida, fecha.

  **Reglas del negocio:**

  1. Al registrar una salida de stock, el sistema debe verificar que la cantidad solicitada no exceda la cantidad disponible.
  2. El sistema debe generar una alerta visual (ej. un `badge` de Bootstrap) si el stock de un producto cae por debajo de un umbral predefinido (e.g., menos de 5 unidades).

## b) 📊 Consultas Funcionales

1. Mostrar la cantidad total de productos en inventario.
2. Listar todos los productos con stock bajo (bajo el umbral de alerta).
3. Calcular el valor total del inventario (precio por stock de cada producto).
4. Listar los 5 productos más vendidos en el último mes.
5. Obtener un historial de las entradas y salidas de un producto específico.

---

## 💻 Componentes de Interfaz (Requeridos)

- Navbar Bootstrap con enlaces a cada sección (Inicio, Productos, Entradas, Salidas, Inventario).
- Login y Logout con formularios estilizados.
- Uso de tablas de Bootstrap para listar productos con su stock y alertas.
- Formularios responsivos con Bootstrap 5 para el registro y gestión.

---

## ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite o Postgres SQL

---

## 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de productos, entradas y salidas de stock.
- Interfaz limpia y navegable.
- Validaciones requeridas.
- Empleo de formularios en Django.
- Mensajes de acción (e.g., "Producto añadido con éxito").
- Funciones de consulta implementadas en views.

## 💡 Recomendaciones

- Prioriza la funcionalidad sobre el diseño.
- Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- Apóyate en la documentación oficial (`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.

---

¡Mucho éxito! 📦
