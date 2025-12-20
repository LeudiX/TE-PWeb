import { apiManager } from "../apiManager.js";
import { renderizarUsuarios } from "./renderizar.js";

export async function listarUsuarios() {
  try {
    const usuarios = await apiManager.listar("usuarios");
    renderizarUsuarios(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
  }
}
