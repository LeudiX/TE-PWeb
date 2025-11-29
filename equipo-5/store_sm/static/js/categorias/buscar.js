import { apiManager } from "../apiManager.js"; // Asumo que está en este archivo
import { renderizar } from "./renderizar.js";

export async function buscar(setBusacarResults, setQuery) {
  console.log("click en buscar");
  const searchInput = document.getElementById("searchInput");
  try {
    // Usar apiManager.buscar en lugar de buscarCategorias
    const data = await apiManager.buscar("categorias", searchInput.value);
    const categorias = data.results;
    setBusacarResults(true);
    setQuery(searchInput.value);
    renderizar(categorias);
  } catch (error) {
    console.error("Error en búsqueda:", error);
  }
}
