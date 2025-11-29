import { apiManager } from "../../apiManager.js";
import { validarProducto, validarCampo } from "../validaciones.js";
import {
  mostrarErroresEnFormulario,
  mostrarErrorIndividual,
} from "../mostrarErrores.js";
import { requireRole } from "../../base/guards.js";

(function initCategoriaModule() {
  // Proteger la página: solo usuarios con rol 'almacenero' o 'admin' pueden acceder
  if (!requireRole("Almacenero", "Admin")) {
    // No autorizado: salimos del init sin añadir listeners
    return;
  }
const cancelar = document.getElementById("cancelarBtn");
cancelar.addEventListener("click", atras);

function atras() {
  window.history.back();
}

const boton = document.getElementById("btn_crear_producto");
boton.addEventListener("click", crear);

async function crear() {
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);
  const errores = validarProducto(formData);

  if (Object.keys(errores).length > 0) {
    mostrarErroresEnFormulario(errores);
    return;
  }

  try {
    const res = await apiManager.crear("productos", formData);
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
    if (error.status == 400) {
      showToast(`${error.body.nombre}`, "error", 3000);
    }
    if (error.status == 401) {
      window.location.href = "/";
    }
  }
}

// Configurar eventos de validación individual para cada input
function configurarValidacionIndividual() {
  // Mapeo de campos a sus IDs
  const campos = {
    nombre: "nombre",
    precio: "precioCompra",
    precio_venta: "precioVenta",
    cantidad: "stock",
    categoria: "categoria",
    descripcion: "descripcion",
    imagen: "imagen",
  };

  // Configurar evento input para cada campo
  Object.entries(campos).forEach(([campo, id]) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.addEventListener("input", function (event) {
        validarCampoIndividual(campo, event.target);
      });

      // Para el campo de imagen, también agregar evento change
      if (campo === "imagen") {
        elemento.addEventListener("change", function (event) {
          validarCampoIndividual(campo, event.target);
        });
      }

      // Para select (categoría), también agregar evento change
      if (campo === "categoria") {
        elemento.addEventListener("change", function (event) {
          validarCampoIndividual(campo, event.target);
        });
      }
    }
  });

  // Configurar eventos especiales para campos dependientes
  const precioCompra = document.getElementById("precioCompra");
  const precioVenta = document.getElementById("precioVenta");

  // Cuando cambia el precio de compra, también validar precio de venta
  if (precioCompra && precioVenta) {
    precioCompra.addEventListener("input", function () {
      validarCampoIndividual("precio_venta", precioVenta);
    });
  }
}

// Función para validar un campo individualmente
function validarCampoIndividual(campo, elemento) {
  const formulario = document.getElementById("formProducto");
  const formData = new FormData(formulario);

  let valor;
  if (campo === "imagen") {
    valor = elemento.files[0] || null;
  } else {
    valor = elemento.value;
  }

  const error = validarCampo(campo, valor, formData);
  mostrarErrorIndividual(campo, error);
}

// Inicializar la validación individual cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
  configurarValidacionIndividual();
});

// ELIMINA ESTE EVENTO GLOBAL - causa conflicto con la validación individual
// formulario.addEventListener("input", function (event) {
//   const formData = new FormData(formulario);
//   const errores = validarProducto(formData);
//   mostrarErroresEnFormulario(errores);
// });

})();