// mostrarErrores.js

export function mostrarErroresEnFormulario(errores) {
  // Limpiar todos los mensajes de error anteriores
  const mensajesError = document.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.textContent = "";
  });

  // Mostrar los nuevos errores
  Object.keys(errores).forEach((campo) => {
    const elementoError =
      document
        .querySelector(`[name="${campo}"]`)
        .closest(".form-group")
        ?.querySelector(".error-message") ||
      document.querySelector(`[name="${campo}"]`).nextElementSibling;

    if (elementoError && elementoError.classList.contains("error-message")) {
      elementoError.textContent = errores[campo];
    }
  });
}

// NUEVA FUNCIÓN para mostrar errores individuales
export function mostrarErrorIndividual(campo, mensajeError) {
  // Mapeo de nombres de campos a los atributos name en el HTML
  const mapeoCampos = {
    nombre: "nombre",
    precio: "precio",
    precio_venta: "precio_venta",
    cantidad: "cantidad",
    categoria: "categoria",
    descripcion: "descripcion",
    imagen: "imagen",
  };

  const nombreCampo = mapeoCampos[campo];
  if (!nombreCampo) return;

  // Buscar el elemento del formulario por name
  const elementoInput = document.querySelector(`[name="${nombreCampo}"]`);
  if (!elementoInput) return;

  // Buscar el elemento de error
  const elementoError =
    elementoInput.closest(".form-group")?.querySelector(".error-message") ||
    elementoInput.nextElementSibling;

  if (elementoError && elementoError.classList.contains("error-message")) {
    if (mensajeError) {
      elementoError.textContent = mensajeError;
    } else {
      elementoError.textContent = ""; // Limpiar error si no hay mensaje
    }
  }
}
