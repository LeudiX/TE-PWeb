import { postCategoria } from "./peticiones/post.js";
import { validarNombreCategoria } from "./validaciones.js";

export async function crear() {
  const input = document.getElementById("inputNombreAgregar");
  const perror = document.getElementById("error-text");
  const nombre = validarNombreCategoria(input.value);

  if (nombre !== "") {
    perror.innerText = nombre;
    return;
  }

  const data = {};
  data.nombre = input.value;
  let respuesta;
  try {
    respuesta = await postCategoria(data);
    perror.innerText = "";
    location.reload();
  } catch (error) {
    let erroresNombre = error.body?.nombre || ["Datos no validos"];
    let message = erroresNombre[0];
    if (error.status == 401) {
      window.location.href = "/";
    }
    perror.innerText = `${message}`;
  }
}
