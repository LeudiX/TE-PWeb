import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager

export async function eliminar(e) {
  const resultado = await showConfirmationModal(
    `Seguro que desea eliminar la categoria ${e.target.dataset.name}?`
  );
  if (!resultado) {
    return;
  }
  const id = e.target.dataset.id;
  try {
    // Usar apiManager.eliminar en lugar de deleteCategoria
    const res = await apiManager.eliminar("categorias", id);
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Categoria eliminada",
        type: "success",
        duration: 5000,
        timestamp: Date.now(),
      })
    );
      location.reload();
    console.log(res);
  } catch (error) {
    if (error.status === 404) {
      console.log("el objeto no existe en la Base de datos");
    }
  }
  location.reload();
}
