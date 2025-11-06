// ==========================
// VALIDACIONES FORMULARIO
// ==========================

// Obtener elementos
const inputProducto = document.getElementById('producto');
const inputFecha = document.getElementById('fecha');
const inputCantidad = document.getElementById('cantidad');
const selectTipo = document.getElementById('tipo');
const formMovimiento = document.getElementById('movimientoForm');

// Crear función para mostrar mensajes de error
function mostrarError(input, mensaje) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-text')) {
    error = document.createElement('div');
    error.className = 'error-text';
    error.style.color = 'red';
    error.style.fontSize = '13px';
    error.style.marginTop = '2px';
    input.insertAdjacentElement('afterend', error);
  }
  error.textContent = mensaje;
}

// Limpiar error
function limpiarError(input) {
  let error = input.nextElementSibling;
  if (error && error.classList.contains('error-text')) {
    error.textContent = '';
  }
}

// ==========================
// Validaciones en tiempo real
// ==========================

// Validar nombre del producto
inputProducto.addEventListener('input', function () {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (inputProducto.value.trim() === '') {
    mostrarError(inputProducto, 'El nombre es obligatorio');
  } else if (!regex.test(inputProducto.value)) {
    mostrarError(inputProducto, 'Solo se permiten letras (sin números ni caracteres especiales)');
  } else {
    limpiarError(inputProducto);
  }
});

// Validar fecha actual obligatoria
inputFecha.addEventListener('input', function () {
  const hoy = new Date().toISOString().split('T')[0];
  if (inputFecha.value !== hoy) {
    mostrarError(inputFecha, 'La fecha debe ser la actual');
  } else {
    limpiarError(inputFecha);
  }
});

// Cantidad: solo enteros positivos
inputCantidad.addEventListener('input', function () {
    const valor = inputCantidad.value.trim();
  
    if (valor === '') {
      mostrarError(inputCantidad, 'La cantidad es obligatoria');
    } else if (!/^[0-9]+$/.test(valor)) { // Solo dígitos del 0-9
      mostrarError(inputCantidad, 'El campo debe contener solo números');
    } else if (Number(valor) <= 0) {
      mostrarError(inputCantidad, 'La cantidad debe ser un número positivo mayor que cero');
    } else {
      limpiarError(inputCantidad);
    }
  });

// Validar tipo de movimiento
selectTipo.addEventListener('change', function () {
  if (selectTipo.value === '') {
    mostrarError(selectTipo, 'Debe seleccionar un tipo de movimiento');
  } else {
    limpiarError(selectTipo);
  }
});

// ==========================
// Validación final al enviar
// ==========================
formMovimiento.addEventListener('submit', function (e) {
  let valido = true;

  // Forzar validaciones antes de enviar
  inputProducto.dispatchEvent(new Event('input'));
  inputFecha.dispatchEvent(new Event('input'));
  inputCantidad.dispatchEvent(new Event('input'));
  selectTipo.dispatchEvent(new Event('change'));

  // Revisar si hay errores visibles
  document.querySelectorAll('.error-text').forEach(err => {
    if (err.textContent !== '') valido = false;
  });

  if (!valido) {
    e.preventDefault();
  } else {
    alert('Movimiento realizado correctamente.');
  }
});

