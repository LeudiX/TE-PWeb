import { patchProducto } from "../peticiones/patch.js";
import { getProducto } from "../peticiones/get.js";

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

async function getData() {
  try {
    const res = await getProducto(id);
    inputNombre.value = res.nombre;
    inputPrecioCompra.value = res.precio;
    inputPrecioVenta.value = res.precio_venta;
    inputStock.value = res.cantidad;
    selectCategoria.value = res.categoria;
    textareaDescripcion.value = res.descripcion;
  } catch (error) {
    console.log(error);
  }
}

async function editar() {
  console.log("hola");
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());
  datos.id = id;
  console.log(datos);
  try {
    const res = await patchProducto(datos);
    console.log(res);
    location.reload();
  } catch (error) {
    console.log(error);
    if (error.status == 401) {
      window.location.href = "/";
    }
  }
}

document.addEventListener("DOMContentLoaded", getData);
