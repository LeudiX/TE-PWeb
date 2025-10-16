// ===========================
// ELEMENTOS DEL DOM
// ===========================

// Contenedor de la tabla donde se agregarán las filas
const cuerpoTabla = document.getElementById('cuerpoTabla');

// Formulario de agregar categoría
const formCategoria = document.getElementById('formCategoria');

// Inputs del formulario
const inputNombreAgregar = document.getElementById('inputNombreAgregar');
const inputCantidadAgregar = document.getElementById('inputCantidadAgregar');

// Checkbox "Seleccionar todo" y área de acciones múltiples
const seleccionarTodo = document.getElementById('seleccionarTodo');
const areaAccionesMultiple = document.getElementById('areaAccionesMultiple');
const btnEliminarSeleccionados = document.getElementById('btnEliminarSeleccionados');

// Fila actualmente seleccionada para editar
let filaSeleccionada = null;

// Modal de edición y sus elementos
const modalEditarEl = document.getElementById('modalEditar');
const modalEditar = new bootstrap.Modal(modalEditarEl);
const inputNombreEditar = document.getElementById('nombreEditar');
const btnGuardarCambios = document.getElementById('btnGuardarCambios');
const mensajeExito = document.getElementById('mensaje-exito');

// Input para filtrar categorías
const inputBuscar = document.getElementById('buscarCategoria');


// ===========================
// FUNCIONES UTILITARIAS
// ===========================

// Escapar caracteres HTML para prevenir inyección al agregar a la tabla
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Crear una fila completa de la tabla con nombre, cantidad y botones de acción
function crearFila(nombre, cantidad) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="td-nombre">${escapeHtml(nombre)}</td>
    <td>${escapeHtml(cantidad)}</td>
    <td>
      <i class="bi bi-pencil-square editar" title="Modificar" style="cursor:pointer; margin-right:8px;"></i>
      <i class="bi bi-trash3 eliminar" title="Eliminar" style="cursor:pointer;"></i>
    </td>
    <td><input type="checkbox" class="fila-check"></td>
  `;
  return tr;
}


// ===========================
// VALIDACIONES
// ===========================

// Crear contenedores de error debajo de cada input si no existen
let errorNombreAgregar = document.createElement('div');
errorNombreAgregar.className = 'text-danger mt-1';
inputNombreAgregar.parentNode.appendChild(errorNombreAgregar);

let errorCantidadAgregar = document.createElement('div');
errorCantidadAgregar.className = 'text-danger mt-1';
inputCantidadAgregar.parentNode.appendChild(errorCantidadAgregar);

let errorNombreEditar = document.createElement('div');
errorNombreEditar.className = 'text-danger mt-1';
inputNombreEditar.parentNode.appendChild(errorNombreEditar);

// Validar nombre: solo letras, mínimo 3 caracteres
function validarNombre(nombre) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
  if (!nombre) return 'El nombre no puede estar vacío.';
  if (!regex.test(nombre)) return 'Mínimo 3 letras, solo letras y espacios.';
  return '';
}

// Validar cantidad: solo enteros positivos (sin decimales, sin negativos)
function validarCantidad(cantidad) {
  const regex = /^[0-9]+$/;
  if (!cantidad) return 'La cantidad no puede estar vacía.';
  if (!regex.test(cantidad)) return 'Ingrese un número entero positivo.';
  return '';
}

// Validación en tiempo real para agregar
inputNombreAgregar.addEventListener('input', () => {
  errorNombreAgregar.textContent = validarNombre(inputNombreAgregar.value.trim());
});
inputCantidadAgregar.addEventListener('input', () => {
  errorCantidadAgregar.textContent = validarCantidad(inputCantidadAgregar.value.trim());
});

// Validación en tiempo real para editar
inputNombreEditar.addEventListener('input', () => {
  errorNombreEditar.textContent = validarNombre(inputNombreEditar.value.trim());
});


// ===========================
// AGREGAR CATEGORÍA
// ===========================
formCategoria.addEventListener('submit', function(e) {
  e.preventDefault(); // evitar recarga de página

  const nombre = inputNombreAgregar.value.trim();
  const cantidad = inputCantidadAgregar.value.trim() || '0';

  // Validaciones
  const errorNom = validarNombre(nombre);
  const errorCant = validarCantidad(cantidad);

  errorNombreAgregar.textContent = errorNom;
  errorCantidadAgregar.textContent = errorCant;

  // Si hay errores, no continuar
  if (errorNom || errorCant) return;

  // Crear y agregar fila a la tabla
  const nuevaFila = crearFila(nombre, cantidad);
  cuerpoTabla.appendChild(nuevaFila);

  // Reset del formulario y errores
  formCategoria.reset();
  errorNombreAgregar.textContent = '';
  errorCantidadAgregar.textContent = '';

  // Actualizar botones de selección múltiple
  actualizarEstadoSeleccionados();
});


// ===========================
// EDITAR / ELIMINAR CATEGORÍA
// ===========================

// Delegación de eventos en la tabla para editar o eliminar
cuerpoTabla.addEventListener('click', function(e) {
  const editBtn = e.target.closest('.editar');
  const delBtn = e.target.closest('.eliminar');

  // EDITAR
  if (editBtn) {
    filaSeleccionada = editBtn.closest('tr');
    const nombreTd = filaSeleccionada.querySelector('.td-nombre');
    const nombreActual = nombreTd.childNodes[0].textContent.trim();
    inputNombreEditar.value = nombreActual;
    mensajeExito.style.display = 'none';
    errorNombreEditar.textContent = '';
    modalEditar.show();
    inputNombreEditar.focus();
    return;
  }

  // ELIMINAR
  if (delBtn) {
    const fila = delBtn.closest('tr');
    if (confirm('¿Está seguro que desea eliminar esta categoría?')) {
      fila.remove();
      actualizarEstadoSeleccionados();
    }
  }
});

// Guardar cambios del modal
btnGuardarCambios.addEventListener('click', function() {
  if (!filaSeleccionada) return;

  const nuevoNombre = inputNombreEditar.value.trim();
  const errorNom = validarNombre(nuevoNombre);
  errorNombreEditar.textContent = errorNom;
  if (errorNom) return;

  // Actualizar nombre en la tabla
  const tdNombre = filaSeleccionada.querySelector('.td-nombre');
  tdNombre.textContent = nuevoNombre;

  // Badge temporal indicando actualización
  const badge = document.createElement('span');
  badge.className = 'badge bg-primary ms-2';
  badge.textContent = 'Actualizado';
  tdNombre.appendChild(badge);

  // Mensaje de éxito en el modal
  mensajeExito.style.display = 'block';
  setTimeout(() => {
    modalEditar.hide();
    setTimeout(() => { mensajeExito.style.display = 'none'; }, 200);
  }, 900);

  // Remover badge después de 7 segundos
  setTimeout(() => badge.remove(), 7000);
});


// ===========================
// CHECKBOXES Y SELECCIÓN MÚLTIPLE
// ===========================

// Detectar cambios individuales en los checkboxes
cuerpoTabla.addEventListener('change', function(e) {
  if (e.target && e.target.classList.contains('fila-check')) {
    actualizarEstadoSeleccionados();
  }
});

// "Seleccionar todo" checkbox
seleccionarTodo.addEventListener('change', function() {
  const checks = cuerpoTabla.querySelectorAll('input.fila-check');
  checks.forEach(c => c.checked = seleccionarTodo.checked);
  actualizarEstadoSeleccionados();
});

// Actualizar estado de los botones de acciones múltiples
function actualizarEstadoSeleccionados() {
  const checks = cuerpoTabla.querySelectorAll('input.fila-check');
  const seleccionados = Array.from(checks).filter(c => c.checked);
  // Mostrar/ocultar botón de eliminar seleccionados
  areaAccionesMultiple.style.display = seleccionados.length >= 1 ? 'flex' : 'none';
  // Sincronizar checkbox "Seleccionar todo"
  seleccionarTodo.checked = checks.length > 0 && Array.from(checks).every(c => c.checked);
}

// Eliminar categorías seleccionadas
btnEliminarSeleccionados.addEventListener('click', function() {
  const checks = cuerpoTabla.querySelectorAll('input.fila-check');
  const seleccionados = Array.from(checks).filter(c => c.checked);
  if (seleccionados.length === 0) return;
  if (!confirm(`¿Está seguro que desea eliminar las ${seleccionados.length} categorías seleccionadas?`)) return;

  seleccionados.forEach(chk => {
    const fila = chk.closest('tr');
    fila && fila.remove();
  });
  actualizarEstadoSeleccionados();
});


// ===========================
// FILTRAR CATEGORÍAS
// ===========================
inputBuscar.addEventListener('input', function() {
  const filtro = inputBuscar.value.toLowerCase();
  cuerpoTabla.querySelectorAll('tr').forEach(fila => {
    const nombreTd = fila.querySelector('.td-nombre');
    const nombre = nombreTd ? nombreTd.childNodes[0].textContent.toLowerCase() : '';
    fila.style.display = nombre.includes(filtro) ? '' : 'none';
  });
});


// ===========================
// PAGINACIÓN (ejemplo simple)
// ===========================
let paginaActual = 1;

// Generar paginación de tabla
function generarPaginacion(totalPaginas) {
  const pag = document.getElementById('paginacionTabla');
  pag.innerHTML = '';

  // Botón Anterior
  const liPrev = document.createElement('li');
  liPrev.className = `page-item ${paginaActual === 1 ? 'disabled' : ''}`;
  liPrev.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
  liPrev.addEventListener('click', ev => {
    ev.preventDefault();
    if (paginaActual > 1) cambiarPagina(paginaActual - 1);
  });
  pag.appendChild(liPrev);

  // Números de página
  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener('click', ev => { ev.preventDefault(); cambiarPagina(i); });
    pag.appendChild(li);
  }

  // Botón Siguiente
  const liNext = document.createElement('li');
  liNext.className = `page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`;
  liNext.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
  liNext.addEventListener('click', ev => { ev.preventDefault(); if (paginaActual < totalPaginas) cambiarPagina(paginaActual + 1); });
  pag.appendChild(liNext);
}

// Cambiar página actual
function cambiarPagina(p) {
  paginaActual = p;
  generarPaginacion(5); // ejemplo fijo
}


// ===========================
// ESTADO INICIAL
// ===========================
actualizarEstadoSeleccionados();
generarPaginacion(5);

// ===========================
// MENÚ RESPONSIVE 'MI CUENTA'
// - Click en desktop para alternar dropdown
// - Click fuera cierra
// - Toggle móvil + click fuera cierra
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  try {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const userAccount = document.getElementById('user-account');
    const dropdownDesktop = document.getElementById('dropdown');
    const userMenuEl = document.getElementById('user-menu');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // Desktop: click para abrir/cerrar
    if (userAccount && dropdownDesktop && userMenuEl) {
      userAccount.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownDesktop.classList.toggle('show');
      });

      document.addEventListener('click', (event) => {
        if (!userMenuEl.contains(event.target)) {
          dropdownDesktop.classList.remove('show');
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          navLinks && navLinks.classList.remove('active');
          dropdownDesktop.classList.remove('show');
        }
      });
    }

    // Móvil: toggle y cerrar al hacer click fuera
    const miCuentaMobile = document.getElementById('mi-cuenta-mobile');
    const dropdownMobile = document.getElementById('dropdown-mobile');

    if (miCuentaMobile && dropdownMobile) {
      miCuentaMobile.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMobile.style.display = dropdownMobile.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', (e) => {
        if (!miCuentaMobile.contains(e.target) && !dropdownMobile.contains(e.target)) {
          dropdownMobile.style.display = 'none';
        }
      });
    }
  } catch (err) {
    console.warn('Error inicializando menú responsive:', err);
  }
});
