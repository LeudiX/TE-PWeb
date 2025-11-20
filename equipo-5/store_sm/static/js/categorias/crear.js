import { postCategoria } from "./peticiones/post.js";
import { validarNombreCategoria } from "./validaciones.js";

export async function crear() {
  const input = document.getElementById("inputNombreAgregar");
  const perror = document.getElementById("error-text");
  const nombre = validarNombreCategoria(input.value);

  if (nombre !== "") {
    showToast(`${nombre}`, "error", 5000);
    perror.innerText = nombre;
    return;
  }

  const data = {};
  data.nombre = input.value;
  let respuesta;
  try {
    respuesta = await postCategoria(data);
    perror.innerText = "";
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Categoria creada",
        type: "success",
        duration: 2000,
        timestamp: Date.now(),
      })
    );
    showToast("Categoria creada", "success", 2000);

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
