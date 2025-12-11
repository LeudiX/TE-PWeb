import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager
import { renderizarUsuarios } from "./renderizar.js";

let page = 1;
let anterior = "";
let total = 1;

export async function paginar(query, next) {
  const showPag = document.getElementById("pageInfo");

  if (query !== anterior) {
    page = 1;
    anterior = query;
  }
  let paginado = {};

  // Obtener datos iniciales para calcular el total de páginas
  paginado = await apiManager.listar("usuarios", { query: query, page: 1 });

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

  // Usar apiManager.listar con la página calculada
  const data = await apiManager.listar("usuarios", {
    query: query,
    page: page,
  });
  console.log(data);
  showPag.innerText = `Pagina ${page}`;
  renderizarUsuarios(data);
}
