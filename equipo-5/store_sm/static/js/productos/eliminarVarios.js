import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager

export async function eliminarVarios() {
  const resultado = await showConfirmationModal(
    `Seguro que desea eliminar estos productos?`
  );
  if (!resultado) {
    return;
  }
  const ids = [];
  const otras = document.getElementsByClassName("seleccionar");
  for (let item of otras) {
    console.log("item ", item.dataset.stock);
    if (item.checked === true && parseInt(item.dataset.stock) > 0) {
      ids.push(item.dataset.id);
    }
    
  }
  console.log("ids para eliminar ", ids);
  if (ids.length === 0) {
      localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "No se seleccionaron productos con stock disponible para eliminar",
        type: "error",
        duration: 5000,
        timestamp: Date.now(),
      })
    );
      location.reload();
      console.log("No se seleccionaron productos para eliminar");
      return;
    }
  const body = {
    ids: ids,
  };
  try {
    // Usar apiManager.eliminarVarios en lugar de deleteProductos
    const res = await apiManager.eliminarVarios("productos", body);
    console.log("Se eliminaron los productos", res);
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Productos eliminados",
        type: "success",
        duration: 5000,
        timestamp: Date.now(),
      })
    );
    showToast("Productos eliminados", "success", 5000);
    location.reload();
  } catch (error) {
    console.log("error al eliminar varios ", error);
    if (error.status === 403) {
      console.log("No tiene permiso para eliminar este objeto");
      showToast("No tiene permiso para eliminar", "error", 3000);
    }
  }
}
