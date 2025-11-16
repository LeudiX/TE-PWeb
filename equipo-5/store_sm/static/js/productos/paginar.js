import { getProductos } from "./peticiones/getAll.js";
import { buscarProductos } from "./peticiones/getBuscar.js";
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
    paginado = await buscarProductos(query, 1);
  } else {
    paginado = await getProductos(1);
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
  if (busqueda) {
    const data = await buscarProductos(query, page);
    productos = data.results;
  } else {
    const data = await getProductos(page);
    productos = data.results;
  }
  showPag.innerText = `Pagina ${page}`;
  renderizar(productos);
  checkBoxAll.checked = false;
  if (!eliminarBtn.classList.contains("d-none")) {
    eliminarBtn.classList.add("d-none");
  }
}
