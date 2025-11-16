console.log("cargando js");
import { api } from "./api.js";
const formulario = document.getElementById("movimientoForm");
formulario.addEventListener("submit", crear);

export async function crear(e) {
  e.preventDefault();
  const formulario = document.getElementById("movimientoForm");
  const formData = new FormData(formulario);
  const object = Object.fromEntries(formData.entries());
  try {
    const res = await api.crearMovimiento(object);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  console.log(object);
}
