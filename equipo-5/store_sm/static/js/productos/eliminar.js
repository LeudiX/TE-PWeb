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

export async function eliminar(e) {
  const { id, name } = e.currentTarget.dataset;

  const resultado = await showConfirmationModal(
    `Seguro que desea eliminar el producto ${name}?`
  );
  if (!resultado) return;

  try {
    const res = await apiManager.eliminar("productos", id);
    console.log(res);

    setMensajeLocal("Producto eliminado", "success", 5000);
    location.reload();
  } catch (error) {
    console.error("Error al eliminar:", error);

    if (error.status === 404) {
      console.warn("El objeto no existe en la Base de datos");
      setMensajeLocal("El producto ya no existe", "error", 3000);
    } else if (error.status !== 401 && error.status !== 403) {
      // Solo mostrar si no es 401/403 (ya lo maneja apiManager)
      setMensajeLocal("Error inesperado al eliminar", "error", 4000);
    }
  }
}
