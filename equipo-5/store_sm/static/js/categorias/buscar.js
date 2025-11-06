import { buscarCategorias } from "./peticiones/getBuscar.js";
import { renderizar } from "./renderizar.js";
export async function buscar(setBusacarResults, setQuery) {
  console.log("click en buscar");
  const searchInput = document.getElementById("searchInput");
  try {
    const data = await buscarCategorias(searchInput.value);
    const categorias = data.results;
    setBusacarResults(true);
    setQuery(searchInput.value);
    renderizar(categorias);
  } catch (error) {}
}
