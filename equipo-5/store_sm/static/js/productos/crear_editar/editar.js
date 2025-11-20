import { patchProducto } from "../peticiones/patch.js";
import { getProducto } from "../peticiones/get.js";
import { validarProducto } from "../validaciones.js";
import { mostrarErroresEnFormulario } from "../mostrarErrores.js";

const cancelar = document.getElementById("cancelarBtn");
cancelar.addEventListener("click", atras);

function atras() {
  window.history.back();
}

// Obtiene toda la parte de parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Lee el valor del parámetro "id"
const id = params.get("id");

console.log(id);

// const formulario = document.getElementById("formProducto");
// formulario.addEventListener("submit", editar);
const boton = document.getElementById("btn_editar_producto");
boton.addEventListener("click", editar);

// Inputs de la columna izquierda
const inputNombre = document.getElementById("nombre");
const inputPrecioCompra = document.getElementById("precioCompra");
const inputPrecioVenta = document.getElementById("precioVenta");

// Inputs de la columna derecha
const inputStock = document.getElementById("stock");
const selectCategoria = document.getElementById("categoria");

// Textarea de descripción
const textareaDescripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagenActual");
const preview = document.getElementById("previewImagen");

async function getData() {
  try {
    const res = await getProducto(id);
    inputNombre.value = res.nombre;
    inputPrecioCompra.value = res.precio;
    inputPrecioVenta.value = res.precio_venta;
    inputStock.value = res.cantidad;
    selectCategoria.value = res.categoria;
    textareaDescripcion.value = res.descripcion;
    imagen.src = res.imagen;
    preview.src = res.imagen;
    console.log(res.imagen);
  } catch (error) {
    console.log(error);
  }
}

async function editar() {
  console.log("hola");
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);

  // 👇 Si no se selecciona nueva imagen, no tocar el campo
  if (!formulario.imagen.files.length) {
    formData.delete("imagen"); // elimina el campo vacío
  }

  // Validaciones antes de enviar
  const errores = validarProducto(formData);
  if (!(Object.keys(errores).length === 0)) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  try {
    const res = await patchProducto(id, formData);
    console.log(res);

    // persistir para que base.js lo muestre en la página /productos
    try {
      localStorage.setItem(
        "ultimoMensaje",
        JSON.stringify({
          message: "Producto editado",
          type: "success",
          duration: 2000,
          timestamp: Date.now(),
        })
      );
      showToast("Producto editado", "success", 2000);
    } catch (e) {
      console.error("No se pudo guardar ultimoMensaje", e);
    }

    showToast("Editado correctamente", "success", 2000);

    // redirigir
    window.location.href = "/productos";
  } catch (error) {
    console.log(error);
    if (error.status == 401) {
      window.location.href = "/";
    }
  }
}

// Agregar el evento input a todos los campos del formulario para validación en tiempo real
const formulario = document.getElementById("formProducto");
formulario.addEventListener("input", function (event) {
  const formData = new FormData(formulario);

  // Si no hay nueva imagen, eliminar el campo para que no falle la validación
  if (!formulario.imagen.files.length) {
    formData.delete("imagen");
  }

  const errores = validarProducto(formData);
  mostrarErroresEnFormulario(errores);
});

document.addEventListener("DOMContentLoaded", getData);
