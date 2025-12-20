import { apiManager } from "../apiManager.js";
import { mostrarErrorIndividual } from "./mostrarErrores.js";

let prevId = 0;
export async function prepararEditar(e) {
  const formCrear = document.getElementById("formCategoriaCrear");
  const formEditar = document.getElementById("formCategoriaEditar");
  const textcat = document.getElementById("textcat");
  const textcat2 = document.getElementById("textcat2");

  const id = e.target.dataset.id;
  const inputIdPlace = document.getElementById("inputHiddenPlace");
  const hiddenInput = document.getElementById("id-hidden-input");

  console.log(prevId);
  console.log(id);

  if (id === prevId) {
    textcat.classList.toggle("d-none");
    textcat2.classList.toggle("d-none");
    formCrear.classList.toggle("d-none");
    formEditar.classList.toggle("d-none");
    inputIdPlace.innerHTML = "";
    prevId = 0;
    // Limpiar errores al cambiar de formulario
    mostrarErrorIndividual("nombre", "");
    return;
  }

  if (!hiddenInput) {
    textcat.classList.toggle("d-none");
    textcat2.classList.toggle("d-none");
    formCrear.classList.toggle("d-none");
    formEditar.classList.toggle("d-none");
  }

  prevId = id;

  inputIdPlace.innerHTML = `<input type="text" id="id-hidden-input" class="d-none" value="${id}" />`;
  const inputNombre = document.getElementById("inputNombreEditar");

  try {
    const data = await apiManager.detalles("categorias", id);
    inputNombre.value = data.nombre;

    // Limpiar error al cargar datos
    mostrarErrorIndividual("nombre", "");
  } catch (error) {
    if (error.status === 404) {
      console.log("bad request");
    }
  }
}
