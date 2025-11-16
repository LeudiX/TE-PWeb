import { getCategorias } from "../../categorias/peticiones/getReallyAll.js";

async function agregarCaegorias() {
  const selectCategorias = document.getElementById("categoria");
  let categorias = [];
  try {
    categorias = await getCategorias();
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
