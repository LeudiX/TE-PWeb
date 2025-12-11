import { apiManager } from "../apiManager.js";

function setMensajeLocal(message, type = "info", duration = 3000) {
  localStorage.setItem(
    "ultimoMensaje",
    JSON.stringify({
      message,
      type,
      duration,
      timestamp: Date.now(),
    })
  );
}

export async function asignarRol(e) {
  const userId = e.currentTarget.dataset.id;
  const value = document.getElementById(`value_rol_${userId}`).value;
  console.log(userId, value);
  try {
    await apiManager.actualizar("usuarios", userId, { role: value });
    setMensajeLocal("Rol asignado", "success", 5000);
  } catch (error) {
    setMensajeLocal("Error al asignar rol", "error", 5000);
    console.log(error);
  }
  location.reload();
}

export async function eliminarUsuario(e) {
    const userId = e.currentTarget.dataset.id;
    const userName = e.currentTarget.dataset.name;
    const resultado = await showConfirmationModal(
    `Seguro que desea eliminar el usuario ${userName}?`
  );
  if (!resultado) return;
  console.log("Eliminar usuario:", userName);
  try {
    await apiManager.eliminar("usuarios", userId);
    setMensajeLocal("Usuario eliminado", "success", 5000);
  } catch (error) {
    setMensajeLocal("Error al eliminar usuario", "error", 5000);
    console.log(error);
  }
  location.reload();
}
