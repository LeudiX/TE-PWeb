import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager
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

  // Obtener datos iniciales para calcular el total de páginas
  if (busqueda) {
    // Usar apiManager.buscar para búsqueda
    paginado = await apiManager.buscar("categorias", query, { page: 1 });
  } else {
    // Usar apiManager.listar para listado normal
    paginado = await apiManager.listar("categorias", { page: 1 });
  }

  console.log(paginado);
  total = Math.ceil(paginado.count / paginado.results.length);

  // Calcular la siguiente página
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
    // Usar apiManager.buscar con la página calculada
    const data = await apiManager.buscar("categorias", query, { page: page });
    categorias = data.results;
  } else {
    // Usar apiManager.listar con la página calculada
    const data = await apiManager.listar("categorias", { page: page });
    categorias = data.results;
  }

  showPag.innerText = `Pagina ${page}`;
  renderizar(categorias);
  checkBoxAll.checked = false;
  if (!eliminarBtn.classList.contains("d-none")) {
    eliminarBtn.classList.add("d-none");
  }
}
