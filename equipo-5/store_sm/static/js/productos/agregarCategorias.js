import { getCategorias } from "../categorias/peticiones/getAll.js";

async function agregarCaegorias() {
  const selectCategorias = document.getElementById("categoria");
  let categorias = [];
  try {
    categorias = await getCategorias();
  } catch (error) {
    if (error.status === 600) {
      console.log(error.message);
    }
  }
  console.log(categorias);
  for (let item of categorias) {
    console.log(item.id);
    selectCategorias.insertAdjacentHTML(
      "beforeend",
      `<option value="${item.id}">${item.nombre}</option>`
    );
  }
}

document.addEventListener("DOMContentLoaded", agregarCaegorias);
