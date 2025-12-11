console.log("soy usuarios");
import { buscar } from "./buscar.js";
import { listarUsuarios } from "./listar.js";
import { paginar } from "./paginar.js";

let query = "";
function setQuery(newQuery) {
  query = newQuery;
}

document.addEventListener("DOMContentLoaded", listarUsuarios);

const formBuscar = document.getElementById("formBuscar");
const nextButton = document.getElementById("nextPage");
const prevButton = document.getElementById("prevPage");

formBuscar.addEventListener("submit", (e) => {
  buscar(e, setQuery);
});

nextButton.addEventListener("click", () => paginar(query, true));
prevButton.addEventListener("click", () => paginar(query, false));
