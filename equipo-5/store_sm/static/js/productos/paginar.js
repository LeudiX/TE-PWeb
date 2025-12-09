import { apiManager } from "../apiManager.js";
import { renderizar } from "./renderizar.js";

let page = 1;
let anterior = false;
let total = 1;
// Variable global para mantener el estado de búsqueda actual
let busquedaActual = "";
let queryActual = "";

export async function paginar(query, busqueda, next) {
  const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
  const showPag = document.getElementById("pageInfo");
  const checkBoxAll = document.getElementById("seleccionarTodo");

  // Verificar si cambió la búsqueda
  if (busqueda !== anterior || query !== queryActual) {
    page = 1;
    anterior = busqueda;
    busquedaActual = busqueda;
    queryActual = query;
  }

  let paginado = {};

  // Obtener datos iniciales para calcular el total de páginas
  if (busquedaActual) {
    // Usar apiManager.buscar para búsqueda
    paginado = await apiManager.buscar("productos", queryActual, { page: 1 });
  } else {
    // Usar apiManager.listar para listado normal
    paginado = await apiManager.listar("productos", { page: 1 });
  }

  total = Math.ceil(paginado.count / paginado.results.length);

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

  let productos = [];
  if (busquedaActual) {
    // Usar apiManager.buscar con la página calculada manteniendo la búsqueda
    const data = await apiManager.buscar("productos", queryActual, {
      page: page,
    });
    productos = data.results;
  } else {
    // Usar apiManager.listar con la página calculada
    const data = await apiManager.listar("productos", { page: page });
    productos = data.results;
  }

  showPag.innerText = `Página ${page}`;
  renderizar(productos);
  checkBoxAll.checked = false;
  if (!eliminarBtn.classList.contains("d-none")) {
    eliminarBtn.classList.add("d-none");
  }
}

// Función para resetear la paginación cuando se inicia una nueva búsqueda
export function resetearPaginacion() {
  page = 1;
  anterior = false;
}
