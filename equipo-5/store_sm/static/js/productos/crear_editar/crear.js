import { postProducto } from "../peticiones/post.js";
import { validarProducto } from "../validaciones.js";
import { mostrarErroresEnFormulario } from "../mostrarErrores.js";

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
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);
  const errores = validarProducto(formData);

  if (!(Object.keys(errores).length === 0)) {
    mostrarErroresEnFormulario(errores);
    return;
  }
  try {
    const res = await postProducto(formData);
    console.log(res);
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Producto creado",
        type: "success",
        duration: 2000,
        timestamp: Date.now(),
      })
    );
    showToast("Producto creado", "success", 2000);
    window.location.href = "/productos";
  } catch (error) {
    console.log(error);
    if (error.status == 401) {
      window.location.href = "/";
    }
  }
}

// Obtener el formulario
const formulario = document.getElementById("formProducto");

// Agregar el evento input a todos los campos del formulario
formulario.addEventListener("input", function (event) {
  const formData = new FormData(formulario);
  const errores = validarProducto(formData);

  // Aquí llamas a tu función para mostrar/ocultar errores
  mostrarErroresEnFormulario(errores);
});
