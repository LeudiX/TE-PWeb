console.log("cargando js");
import { api } from "./api.js";
import { mostrarErroresEnFormulario } from "./mostrarErrores.js";
import { validarMovimiento } from "./validaciones.js";
const formulario = document.getElementById("movimientoForm");
formulario.addEventListener("submit", crear);

// Agregar evento input para validación en tiempo real
formulario.addEventListener("input", function (e) {
  const formData = new FormData(formulario);
  const errores = validarMovimiento(formData);
  mostrarErroresEnFormulario(errores);
});

export async function crear(e) {
  e.preventDefault();
  const formulario = document.getElementById("movimientoForm");
  const formData = new FormData(formulario);
  const errores = validarMovimiento(formData);
  if (!errores) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  const object = Object.fromEntries(formData.entries());
  console.log(object);
  try {
    const res = await api.crearMovimiento(object);
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
    console.log(error);
  }
}
