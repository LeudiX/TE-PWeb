import { buscarProductos } from "./peticiones/getBuscar.js";
import { renderizar } from "./renderizar.js";
export async function buscar(setBusacarResults, setQuery) {
  console.log("click en buscar");
  const searchInput = document.getElementById("searchInput");
  try {
    const data = await buscarProductos(searchInput.value);
    const productos = data.results;
    setBusacarResults(true);
    setQuery(searchInput.value);
    renderizar(productos);
  } catch (error) {}
}
