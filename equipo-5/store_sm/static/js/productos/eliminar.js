import { deleteProducto } from "./peticiones/delete.js";

export async function eliminar(e) {
  if (!window.confirm("Seguro que desea eliminar este producto?")) {
    return;
  }
  const id = e.target.dataset.id;
  try {
    const res = await deleteProducto(id);
    
    console.log(res);
    // location.reload();
  } catch (error) {
    console.log("error al eliminar ", error);
    if (error.status === 404) {
      console.log("el objeto no existe en la Base de datos");
    }
    if (error.status === 403) {
      localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "No tiene permiso para eliminar",
        type: "error",
        duration: 2000,
        timestamp: Date.now(),
      })
    );
    }
  }
  location.reload();
}
