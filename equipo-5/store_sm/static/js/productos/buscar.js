import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager
import { renderizar } from "./renderizar.js";

export async function buscar(setBusacarResults, setQuery) {
  console.log("click en buscar");
  const searchInput = document.getElementById("searchInput");
  try {
    // Usar apiManager.buscar en lugar de buscarProductos
    const data = await apiManager.buscar("productos", searchInput.value);
    const productos = data.results;
    setBusacarResults(true);
    setQuery(searchInput.value);
    renderizar(productos);
  } catch (error) {
    console.error("Error en búsqueda:", error);
  }
}
