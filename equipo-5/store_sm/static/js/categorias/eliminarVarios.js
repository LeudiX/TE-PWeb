import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager

export async function eliminarVarios() {
  const resultado = await showConfirmationModal(
    "Seguro que desea eliminar estas categorias?"
  );
  if (!resultado) {
    return;
  }
  const ids = [];
  const otras = document.getElementsByClassName("seleccionar");
  for (let item of otras) {
    if (item.checked === true) {
      ids.push(item.dataset.id);
    }
  }
  console.log(ids);
  const body = {
    ids: ids,
  };

  // Usar apiManager.eliminarVarios en lugar de deleteCategorias
  try {
      await apiManager.eliminarVarios("categorias", body);
      localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Categorias eliminadas",
        type: "success",
        duration: 5000,
        timestamp: Date.now(),
      })
    );
      location.reload();

  } catch (error) {
    
  }
  location.reload();
}
