export function mostrarErroresEnFormulario(errores) {
  // Limpiar todos los mensajes de error anteriores
  const mensajesError = document.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.textContent = "";
  });

  // Mostrar los nuevos errores
  Object.keys(errores).forEach((campo) => {
    const elementoCampo = document.querySelector(`[name="${campo}"]`);
    if (elementoCampo) {
      // Buscar el contenedor del campo (mb-3) y luego el div de error
      const contenedorCampo = elementoCampo.closest(".mb-3");
      if (contenedorCampo) {
        const elementoError = contenedorCampo.querySelector(".error-message");
        if (elementoError) {
          elementoError.textContent = errores[campo];
        }
      }
    }
  });
}
