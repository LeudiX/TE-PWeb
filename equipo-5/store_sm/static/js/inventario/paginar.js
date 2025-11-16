import { manager } from "./api.js";
import { cargarInventarioCompleto } from "./render/r.innventario.js";

let page = 1;
let total = 1;

export async function paginar(next) {
  let paginado = {};
  paginado = await manager.getInventario(1);

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
  const showPag = document.getElementById("pageInfo");
  showPag.innerText = `Pagina ${page}`;
  cargarInventarioCompleto(page);
}
