import { getCategorias } from "./peticiones/getAll.js";
import { renderizar } from "./renderizar.js";

export async function listar() {
  const checkBoxAll = document.getElementById("seleccionarTodo");
  const inputIdPlace = document.getElementById("inputHiddenPlace");
  let categorias = {};
  try {
    categorias = await getCategorias();
    checkBoxAll.checked = false;
  } catch (error) {
    if (error.status === 600) {
      console.log("error de red");
    } else {
      console.log(error.message);
    }
  }
  renderizar(categorias.results);
  inputIdPlace.innerHTML = "";
}
