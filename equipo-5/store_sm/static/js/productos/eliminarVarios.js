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
    const data = res.json();
    console.log(data);
    location.reload();
  } catch (error) {}
}
