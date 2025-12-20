import { apiManager } from "../apiManager.js";
import { renderizarUsuarios } from "./renderizar.js";

export async function buscar(e, setQuery) {
  e.preventDefault();
  const input = document.getElementById("searchInput");
  const query = input.value;
  setQuery(query);
  console.log(query);

  try {
    const usuarios = await apiManager.listar("usuarios", { query: query });
    renderizarUsuarios(usuarios);
  } catch (error) {
    console.log(error);
  }
}
