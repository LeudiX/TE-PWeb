import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager
import { renderizar } from "./renderizar.js";

export async function listar() {
  const checkBoxAll = document.getElementById("seleccionarTodo");
  const inputIdPlace = document.getElementById("inputHiddenPlace");
  let categorias = {};
  try {
    // Usar apiManager.listar en lugar de getCategorias
    categorias = await apiManager.listar("categorias");
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
