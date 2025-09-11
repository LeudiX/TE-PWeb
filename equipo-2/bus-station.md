# 🧪 Examen Mundial de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## 🚌 Sistema de Gestión de Transporte y Rutas de Navarra

### ⏱️ **Duración:** 4 horas

### 📝 **Modalidad:** Desarrollo individual – Proyecto Django funcional

---

### 📘 Contexto

La Empresa Provincial de Transporte de Navarra desea informatizar la gestión de sus terminales, rutas y medios de transporte para facilitar el trabajo de los empleados administrativos encargados de planificar, monitorear y organizar el estado de la flota y sus asignaciones.

Para ello desarrollará un sistema web funcional con Django + Bootstrap 5, utilizando los conceptos y tecnologías aprendidas durante el semestre (HTML, CSS, JavaScript, Django ORM, vistas, templates, formularios y seguridad).

---

### 🔐 Seguridad y Roles

El sistema debe contar con autenticación y dos tipos de usuarios:

👨‍💼 Administrador **(Superuser)**

- Puede registrar terminales, rutas y medios de transporte.
- Puede asignar los medios de transporte a las terminales.
- Puede asignar rutas a medios de transporte.
- Puede consultar el estado actual de la flotas por cada una de las terminales.

👤 Usuario Regular **(Empleado)**

- Puede registrar los medios de transporte pero **no asignarlos a rutas y ni a terminales**.
- Puede visualizar la información de los **medios que ha registrado** así como sus asignaciones a rutas y terminales.

---

### 🎯 Requisitos Funcionales

#### a) CRUDs principales

1. CRUD **Terminales**
    - Campos:
        - (nombre, municipio, ubicación(Urbana/Rural)).
    - ✏️ **Notas**:
        - ⚠️ Solo puede existir una terminal registrada por municipio.
2. CRUD **Rutas**
    - Campos:
        - (nombre, origen, destino, cant_km).
    - ✏️ **Notas**:
        - ⚠️ El `nombre` de la ruta debe generarse automáticamente a partir del `origen` y `destino`
            **(ej: Pamplona - Tudela)**.
        - ⚠️ `origen` y `destino` no pueden ser iguales.
        - ⚠️ El valor de `cant_km` debe ser mayor que cero.
3. CRUD **Medios de Transporte**
   - Campos:
        - (matricula, tipo(Ómnibus, Camión, Automóvil), estado(Operativo/Mantenimiento)).
   - ✏️ **Notas**:
        - ⚠️ La `matrícula` debe ser única y con el siguiente formato **(ej: NAV-xxxx)** autogenerado.
        - ⚠️ Un medio de transporte en estado **Operativo** solo puede estar asignado a una ruta específica.
        - ⚠️ No se pueden asignar rutas a medios de transporte en estado **Mantenimiento**.
        - ⚠️ Si la `ubicación` de la terminal es **Rural** solo se pueden asignarse medios de tipo **Camión**.

---

### 📊 b) Consultas Funcionales

1. Mostrar el número total de medios de transporte **por estado** en cada una de las terminales.
2. Listar los medios de transporte **asignados a una ruta específica** con más de 50 km de distancia.
3. Mostrar la ruta con más vehiculos **operativos** por cada una de la terminales.

---

### 📝 Datos para pruebas

- Terminal: "Central Pamplona", Pamplona, Urbana
- Ruta: Pamplona - Tudela, 110 km
- Medio: Matrícula: "NAV-4582", Tipo: Ómnibus, Estado: Operativo

---

### 📎 Bonus

- Usa JavaScript para validar campos en tiempo real **(ej: evitar duplicación de matrícula)**.

### ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite

---

### 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de terminales, rutas y medios de transporte.
- Asignaciones de medios de transporte a terminales y rutas
- Interfaz limpia y navegable.
- Validaciones requeridas
- Empleo de formularios en Django
- Funciones de consulta implementadas en views.

---

### 💡 Recomendaciones

- 💡 Prioriza la funcionalidad sobre el diseño.
- 💡 Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- 💡 Apóyate en la documentación oficial(`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.
- ⚠️ Evita a toda costa el empleo de **chatbots LLM**  o cualquier otra herramienta **IA** en la realización de este ejercicio.

---

## ¡Mucho éxito! 🚌