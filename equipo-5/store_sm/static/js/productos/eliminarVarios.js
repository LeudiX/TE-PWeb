import { deleteProductos } from "./peticiones/deleteMany.js";

export async function eliminarVarios() {
  const confirmacion = window.confirm(
    "Seguro que desea eliminar estos elementos?"
  );
  if (!confirm) {
    return;
  }
  const ids = [];
  const otras = document.getElementsByClassName("seleccionar");
  for (let item of otras) {
    if (item.checked === true) {
      ids.push(item.dataset.id);
    }
  }
  console.log("ids frontend ", ids);
  const body = {
    ids: ids,
  };
  try {
    const res = await deleteProductos(body);
    console.log("Se eliminaron los productos", res);
    location.reload();
  } catch (error) {
    console.log("error al eliminar varios ", error);
    if (error.status === 403) {
      console.log("No tiene permiso para eliminar este objeto");
      showToast("No tiene permiso para eliminar", "error", 3000);
    }
  }
}
