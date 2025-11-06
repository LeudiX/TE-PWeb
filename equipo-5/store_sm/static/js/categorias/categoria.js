import { crear } from "./crear.js";
import { editar } from "./editar.js";
import { listar } from "./listar.js";
import { eliminarVarios } from "./eliminarVarios.js";
import { seleccionar } from "./seleccionar.js";
import { buscar } from "./buscar.js";
import { paginar } from "./paginar.js";

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

document.addEventListener("DOMContentLoaded", listar);

const checkBoxAll = document.getElementById("seleccionarTodo");
checkBoxAll.addEventListener("click", (e) => seleccionar(e));

const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
eliminarBtn.addEventListener("click", eliminarVarios);

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

nextBtn.addEventListener("click", () => paginar(query, buscarResults, true));
prevBtn.addEventListener("click", () => paginar(query, buscarResults, false));
