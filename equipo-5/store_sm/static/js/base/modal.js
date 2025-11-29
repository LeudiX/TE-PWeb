// Función simple para mostrar el modal de confirmación
function showConfirmationModal(message) {
  return new Promise((resolve) => {
    // Obtener elementos del DOM
    const modal = document.getElementById("confirmationModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const closeBtn = document.querySelector(".close-btn");

    // Configurar el mensaje
    modalMessage.textContent = message;

    // Mostrar el modal
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Función para cerrar el modal
    const closeModal = (result) => {
      modal.style.display = "none";
      document.body.style.overflow = "";
      // Remover event listeners
      confirmBtn.onclick = null;
      cancelBtn.onclick = null;
      closeBtn.onclick = null;
      modal.onclick = null;
      document.removeEventListener("keydown", handleEscape);
      resolve(result);
    };

    // Configurar eventos
    confirmBtn.onclick = () => closeModal(true);
    cancelBtn.onclick = () => closeModal(false);
    closeBtn.onclick = () => closeModal(false);

    // Cerrar al hacer clic fuera del modal
    modal.onclick = (event) => {
      if (event.target === modal) {
        closeModal(false);
      }
    };

    // Cerrar con tecla Escape
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
  });
}
