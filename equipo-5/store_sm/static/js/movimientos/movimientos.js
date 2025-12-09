console.log("cargando js");
import { apiManager } from "../apiManager.js";
import {
  mostrarErroresEnFormulario,
  mostrarErrorIndividual,
} from "./mostrarErrores.js";
import { validarMovimiento, validarCampoMovimiento } from "./validaciones.js";

const formulario = document.getElementById("movimientoForm");
formulario.addEventListener("submit", crear);

// Configurar eventos de validación individual para cada input
function configurarValidacionIndividual() {
  // Mapeo de campos para la validación individual
  const campos = [
    { campo: "producto", id: "producto" },
    { campo: "fecha", id: "fecha" },
    { campo: "tipo", id: "tipo" },
    { campo: "cantidad", id: "cantidad" },
  ];

  // Configurar evento input/change para cada campo
  campos.forEach(({ campo, id }) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      // Para selects y inputs usar change e input
      elemento.addEventListener("input", function (event) {
        validarCampoIndividual(campo, event.target);
      });

      elemento.addEventListener("change", function (event) {
        validarCampoIndividual(campo, event.target);
      });
    }
  });
}

// Función para validar un campo individualmente
function validarCampoIndividual(campo, elemento) {
  const formulario = document.getElementById("movimientoForm");
  const formData = new FormData(formulario);
  const valor = elemento.value;

  const error = validarCampoMovimiento(campo, valor, formData);
  mostrarErrorIndividual(campo, error);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  configurarValidacionIndividual();
});

export async function crear(e) {
  e.preventDefault();
  const formulario = document.getElementById("movimientoForm");
  const formData = new FormData(formulario);
  const errores = validarMovimiento(formData);

  // Corregí esta condición - estaba negando errores incorrectamente
  if (Object.keys(errores).length > 0) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  const object = Object.fromEntries(formData.entries());
  console.log(object);
  try {
    const res = await apiManager.crear("movimientos", object);
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Movimiento creado",
        type: "success",
        duration: 2000,
        timestamp: Date.now(),
      })
    );
    showToast("Movimiento creado", "success", 2000);
    formulario.reset();
  } catch (error) {
    console.log(error.body?.error || error.message);
  }
}

// ELIMINAR ESTE EVENTO GLOBAL - ya no es necesario
// formulario.addEventListener("input", function (e) {
//   const formData = new FormData(formulario);
//   const errores = validarMovimiento(formData);
//   mostrarErroresEnFormulario(errores);
// });
