import { updateCategoria } from "./peticiones/update.js";
import { validarNombreCategoria } from "./validaciones.js";

export async function editar() {
  const inputName = document.getElementById("inputNombreEditar");
  const inputId = document.getElementById("id-hidden-input");
  const perror = document.getElementById("error-text2");
  const nombre = validarNombreCategoria(inputName.value);
  const data = {};

  if (nombre !== "") {
    perror.innerText = nombre;
    return;
  }

  data.nombre = inputName.value;
  data.id = inputId.value;
  console.log(data.id, data.nombre);

  let respuesta;
  try {
    respuesta = await updateCategoria(data);
    perror.innerText = "";
    location.reload();
  } catch (error) {
    let mensage = "";
    if (error.status == 400) {
      mensage = "datos no validos";
    }
    if (error.status == 401) {
      window.location.href = "/login/";
    }
    perror.innerText = `${mensage}`;
  }

  console.log(respuesta);
  const inputIdPlace = document.getElementById("inputHiddenPlace");
  inputIdPlace.innerHTML = "";
  location.reload();
}
