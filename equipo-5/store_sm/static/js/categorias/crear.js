import { apiManager } from "../apiManager.js";
import { validarCategoria } from "./validaciones.js";
import { mostrarErroresEnFormulario } from "./mostrarErrores.js";

export async function crear() {
  const formulario = document.getElementById("formCategoriaCrear");
  const formData = new FormData(formulario);

  // Validar todos los campos
  const errores = validarCategoria(formData);

  if (Object.keys(errores).length > 0) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  const data = Object.fromEntries(formData.entries());
  let respuesta;

  try {
    respuesta = await apiManager.crear("categorias", data);

    // Limpiar errores y formulario
    mostrarErroresEnFormulario({});
    formulario.reset();

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

    // Recargar la lista de categorías
    // En lugar de location.reload(), podrías llamar a una función que actualice la tabla
    location.reload();
  } catch (error) {
    let erroresNombre = error.body?.nombre || ["Datos no validos"];
    let message = erroresNombre[0];

    if (error.status == 401) {
      window.location.href = "/";
    }

    // Mostrar error del servidor
    mostrarErroresEnFormulario({ nombre: message });
  }
}
