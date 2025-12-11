import { apiManager } from "../../apiManager.js";
import { validarProducto, validarCampo } from "../validaciones.js";
import {
  mostrarErroresEnFormulario,
  mostrarErrorIndividual,
} from "../mostrarErrores.js";
import { requireRole } from "../../base/guards.js";

(function initProductoModule() {
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

  // Obtiene toda la parte de parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);

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
  const inputImagen = document.getElementById("imagen");

  async function getData() {
    try {
      const res = await apiManager.detalles("productos", id);
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
    let formData = new FormData(formulario);
    let traia_imagen = false;

    // 👇 Si no se selecciona nueva imagen, no tocar el campo
    if (!formulario.imagen.files.length) {
      formData.delete("imagen"); // elimina el campo vacío
      traia_imagen = true;
    }

    // Validaciones antes de enviar
    const errores = validarProducto(formData);
    if (Object.keys(errores).length > 0) {
      mostrarErroresEnFormulario(errores);
      return;
    }
    if (traia_imagen) {
      formData = Object.fromEntries(formData);
    }
    try {
      const res = await apiManager.actualizar("productos", id, formData);
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

  // Configurar eventos de validación individual para cada input
  function configurarValidacionIndividual() {
    // Mapeo de campos para la validación individual
    const campos = [
      { campo: "nombre", id: "nombre" },
      { campo: "precio", id: "precioCompra" },
      { campo: "precio_venta", id: "precioVenta" },
      { campo: "cantidad", id: "stock" },
      { campo: "categoria", id: "categoria" },
      { campo: "descripcion", id: "descripcion" },
      { campo: "imagen", id: "imagen" },
    ];

    // Configurar evento input para cada campo
    campos.forEach(({ campo, id }) => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.addEventListener("input", function (event) {
          validarCampoIndividual(campo, event.target);
        });

        // Para campos especiales
        if (campo === "imagen") {
          elemento.addEventListener("change", function (event) {
            validarCampoIndividual(campo, event.target);
          });
        }

        if (campo === "categoria") {
          elemento.addEventListener("change", function (event) {
            validarCampoIndividual(campo, event.target);
          });
        }
      }
    });

    // Configurar dependencias entre campos
    const precioCompra = document.getElementById("precioCompra");
    const precioVenta = document.getElementById("precioVenta");

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

    // Si no hay nueva imagen, eliminar el campo para que no falle la validación
    if (!formulario.imagen.files.length) {
      formData.delete("imagen");
    }

    let valor;
    if (campo === "imagen") {
      valor = elemento.files[0] || null;
    } else {
      valor = elemento.value;
    }

    const error = validarCampo(campo, valor, formData);
    mostrarErrorIndividual(campo, error);
  }

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    getData();
    configurarValidacionIndividual();
  });

  // ELIMINAR ESTE EVENTO GLOBAL - ya no es necesario
  // const formulario = document.getElementById("formProducto");
  // formulario.addEventListener("input", function (event) {
  //   const formData = new FormData(formulario);
  //   if (!formulario.imagen.files.length) {
  //     formData.delete("imagen");
  //   }
  //   const errores = validarProducto(formData);
  //   mostrarErroresEnFormulario(errores);
  // });
})();
