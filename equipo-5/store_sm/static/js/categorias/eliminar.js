import { deleteCategoria } from "./peticiones/delete.js";

export async function eliminar(e) {
  const id = e.target.dataset.id;
  try {
    const res = await deleteCategoria(id);
    const data = res.json();
    console.log(data);
  } catch (error) {
    if (error.status === 404) {
      console.log("el objeto no existe en la Base de datos");
    }
  }
  location.reload();
}
