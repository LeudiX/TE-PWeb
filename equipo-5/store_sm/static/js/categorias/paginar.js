import { getCategorias } from "./peticiones/getAll.js";
import { buscarCategorias } from "./peticiones/getBuscar.js";
import { renderizar } from "./renderizar.js";

let page = 1;
let anterior = false;
let total = 1;

export async function paginar(query, busqueda, next) {
  const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
  const showPag = document.getElementById("pageInfo");
  const checkBoxAll = document.getElementById("seleccionarTodo");
  if (busqueda !== anterior) {
    page = 1;
    anterior = busqueda;
  }
  let paginado = {};
  if (busqueda) {
    paginado = await buscarCategorias(query, 1);
  } else {
    paginado = await getCategorias(1);
  }

  total = Math.ceil(paginado.count / 2);

  if (next) {
    if (page < total) {
      page++;
    } else {
      page = 1;
    }
  } else {
    if (page > 1) {
      page--;
    } else {
      page = total;
    }
  }

  let categorias = [];
  if (busqueda) {
    const data = await buscarCategorias(query, page);
    categorias = data.results;
  } else {
    const data = await getCategorias(page);
    categorias = data.results;
  }
  showPag.innerText = `Pagina ${page}`;
  renderizar(categorias);
  checkBoxAll.checked = false;
  if (!eliminarBtn.classList.contains("d-none")) {
    eliminarBtn.classList.add("d-none");
  }
}
