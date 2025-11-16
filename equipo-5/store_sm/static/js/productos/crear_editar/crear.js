import { postProducto } from "../peticiones/post.js";

const cancelar = document.getElementById("cancelarBtn");
cancelar.addEventListener("click", atras);

function atras() {
  window.history.back();
  // window.location.href = "/principal/";
}

// const formulario = document.getElementById("formProducto");
// formulario.addEventListener("submit", crear);
const boton = document.getElementById("btn_crear_producto");
boton.addEventListener("click", crear);

async function crear() {
  console.log("hola");
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());
  console.log(datos);
  try {
    const res = await postProducto(datos);
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.status == 401) {
      window.location.href = "/";
    }
  }
}
