// mostrarErrores.js

export function mostrarErroresEnFormulario(errores) {
  // Limpiar todos los mensajes de error anteriores
  const mensajesError = document.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.textContent = "";
  });

  // Mostrar los nuevos errores
  Object.keys(errores).forEach((campo) => {
    mostrarErrorIndividual(campo, errores[campo]);
  });
}

export function mostrarErrorIndividual(campo, mensajeError) {
  // Mapeo de nombres de campos a los atributos name en el HTML
  const mapeoCampos = {
    // Campos de productos
    nombre: "nombre",
    precio: "precio",
    precio_venta: "precio_venta",
    cantidad: "cantidad",
    categoria: "categoria",
    descripcion: "descripcion",
    imagen: "imagen",

    // Campos de movimientos
    producto: "producto",
    fecha: "fecha",
    tipo: "tipo",
    cantidad: "cantidad",
  };

  const nombreCampo = mapeoCampos[campo];
  if (!nombreCampo) return;

  // Buscar el elemento del formulario por name
  const elementoInput = document.querySelector(`[name="${nombreCampo}"]`);
  if (!elementoInput) return;

  // Buscar el contenedor del campo (mb-3 o form-group) y luego el div de error
  const contenedorCampo =
    elementoInput.closest(".mb-3") || elementoInput.closest(".form-group");
  if (contenedorCampo) {
    const elementoError = contenedorCampo.querySelector(".error-message");
    if (elementoError) {
      if (mensajeError) {
        elementoError.textContent = mensajeError;
        elementoError.style.display = "block";
        elementoInput.classList.add("is-invalid");
      } else {
        elementoError.textContent = "";
        elementoError.style.display = "none";
        elementoInput.classList.remove("is-invalid");
      }
    }
  }
}

// Función para limpiar todos los errores
export function limpiarErrores() {
  const mensajesError = document.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.textContent = "";
    mensaje.style.display = "none";
  });

  // También remover clases is-invalid de los inputs
  const inputsInvalidos = document.querySelectorAll(".is-invalid");
  inputsInvalidos.forEach((input) => {
    input.classList.remove("is-invalid");
  });
}
