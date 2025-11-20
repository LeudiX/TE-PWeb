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
