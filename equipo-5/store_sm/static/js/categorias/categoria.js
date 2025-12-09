import { requireRole } from "../base/guards.js";
import { apiManager } from "../apiManager.js";
import { crear } from "./crear.js";
import { editar } from "./editar.js";
import { listar } from "./listar.js";
import { eliminarVarios } from "./eliminarVarios.js";
import { seleccionar } from "./seleccionar.js";
import { buscar } from "./buscar.js";
import { paginar } from "./paginar.js";
import { validarCampoCategoria } from "./validaciones.js";
import { mostrarErrorIndividual } from "./mostrarErrores.js";
import { prepararEditar } from "./prepararEditar.js"; // Asumo que existe este archivo

(function initCategoriaModule() {
  // Proteger la página: solo usuarios con rol 'almacenero' o 'admin' pueden acceder
  if (!requireRole("Almacenero", "Admin")) {
    // No autorizado: salimos del init sin añadir listeners
    return;
  }

  // Reemplazar la validación manual por la nueva configuración
  function configurarValidacionIndividual() {
    // Input de crear
    const inputCrear = document.getElementById("inputNombreAgregar");
    if (inputCrear) {
      inputCrear.addEventListener("input", (e) => {
        const formulario = document.getElementById("formCategoriaCrear");
        const formData = new FormData(formulario);
        const error = validarCampoCategoria("nombre", e.target.value, formData);
        mostrarErrorIndividual("nombre", error);
      });
    }

    // Input de editar
    const inputEditar = document.getElementById("inputNombreEditar");
    if (inputEditar) {
      inputEditar.addEventListener("input", (e) => {
        const formulario = document.getElementById("formCategoriaEditar");
        const formData = new FormData(formulario);
        const error = validarCampoCategoria("nombre", e.target.value, formData);
        mostrarErrorIndividual("nombre", error);
      });
    }
  }

  let buscarResults = false;
  function setBusacarResults(valor) {
    buscarResults = valor;
  }
  let query = "";
  function setQuery(valor) {
    query = valor;
  }

  const formCrear = document.getElementById("formCategoriaCrear");
  formCrear.addEventListener("submit", (e) => {
    e.preventDefault();
    crear();
  });

  const formEditar = document.getElementById("formCategoriaEditar");
  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    editar();
  });

  const formBuscar = document.getElementById("formBuscar");
  formBuscar.addEventListener("submit", (e) => {
    e.preventDefault();
    buscar(setBusacarResults, setQuery);
  });

  document.addEventListener("DOMContentLoaded", function () {
    listar();
    configurarValidacionIndividual(); // Inicializar validación individual
  });

  const checkBoxAll = document.getElementById("seleccionarTodo");
  checkBoxAll.addEventListener("click", (e) => seleccionar(e));

  const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
  eliminarBtn.addEventListener("click", eliminarVarios);

  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  nextBtn.addEventListener("click", () => paginar(query, buscarResults, true));
  prevBtn.addEventListener("click", () => paginar(query, buscarResults, false));
})();
