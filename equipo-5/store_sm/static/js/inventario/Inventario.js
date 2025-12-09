import {
  cargarProductosMasVendidos,
  cargarResumenInventario,
} from "./render/r.estaticos.js";

import { cargarInventarioCompleto } from "./render/r.innventario.js";

import { cargarProductosBajoStock } from "./render/r.bajos.js";

document.addEventListener("DOMContentLoaded", () => {
  cargarResumenInventario();
  cargarProductosMasVendidos();
  cargarProductosBajoStock();
  cargarInventarioCompleto(1);
});

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

import { paginar } from "./paginar.js";

nextBtn.addEventListener("click", () => paginar(true));
prevBtn.addEventListener("click", () => paginar(false));
