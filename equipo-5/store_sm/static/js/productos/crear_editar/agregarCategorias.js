import { apiManager } from "../../apiManager.js"; // Asegúrate de importar apiManager

async function agregarCaegorias() {
  const selectCategorias = document.getElementById("categoria");
  let categorias = [];
  try {
    // Usar apiManager.listar con paginate: false para obtener todas las categorías
    categorias = await apiManager.listar("categorias", { paginate: false });

    for (let item of categorias) {
      selectCategorias.insertAdjacentHTML(
        "beforeend",
        `<option value="${item.id}">${item.nombre}</option>`
      );
    }
  } catch (error) {
    console.log(error);
    if (error.status === 600) {
      console.log(error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", agregarCaegorias);
