import { apiManager } from "../apiManager.js";
import { validarCategoria } from "./validaciones.js";
import { mostrarErroresEnFormulario } from "./mostrarErrores.js";

export async function editar() {
  const formulario = document.getElementById("formCategoriaEditar");
  const formData = new FormData(formulario);
  const inputId = document.getElementById("id-hidden-input");

  // Validar todos los campos
  const errores = validarCategoria(formData);

  if (Object.keys(errores).length > 0) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  const data = Object.fromEntries(formData.entries());
  const categoriaId = inputId.value;

  let respuesta;
  try {
    respuesta = await apiManager.actualizar("categorias", categoriaId, data);

    // Limpiar errores
    mostrarErroresEnFormulario({});

    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "Categoria editada",
        type: "success",
        duration: 2000,
        timestamp: Date.now(),
      })
    );
    showToast("Categoria editada", "success", 2000);

    // Recargar la página para ver los cambios
    location.reload();
  } catch (error) {
    let mensage = "";
    if (error.status == 400) {
      mensage = "Datos no validos";
      mostrarErroresEnFormulario({ nombre: mensage });
    }
    if (error.status == 401) {
      window.location.href = "/login/";
    }
  }
}
