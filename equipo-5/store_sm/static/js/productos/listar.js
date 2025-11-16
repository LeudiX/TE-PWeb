import { getProductos } from "./peticiones/getAll.js";
import { renderizar } from "./renderizar.js";

export async function listar() {
  const checkBoxAll = document.getElementById("seleccionarTodo");
  let productos = {};
  try {
    productos = await getProductos();
    checkBoxAll.checked = false;
  } catch (error) {
    if (error.status === 600) {
      console.log("error de red");
    } else {
      console.log(error.message);
    }
  }
  renderizar(productos.results);
}
