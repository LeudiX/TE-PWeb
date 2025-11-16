import { manager } from "../api.js";

const totalUnidadesElem = document.getElementById("total-unidades");
const totalSKUsElem = document.getElementById("total-skus");
const valorInventarioElem = document.getElementById("valor-inventario");

export async function cargarResumenInventario() {
  try {
    const resumen = await manager.getResumen;
    totalUnidadesElem.textContent = resumen.productos;
    totalSKUsElem.textContent = resumen.stock_total;
    valorInventarioElem.textContent = `€${resumen.valor_total}`;
  } catch (error) {
    console.error("Error al cargar el resumen del inventario:", error);
  }
}

// document.addEventListener("DOMContentLoaded", cargarResumenInventario);

const bodyMasVendidosElem = document.getElementById("body-mas-vendidos");
function crearTuplaMasVendidos(producto, idx) {
  const row = `
        <tr>
          <td>${idx + 1}</td>
          <td>${producto.nombre}</td>
          <td>${producto.categoria}</td>
          <td>${producto.total_vendidos}</td>
          <td>${producto.stock_actual}</td>
        </tr>
        `;
  return row;
}
export async function cargarProductosMasVendidos() {
  try {
    const productos = await manager.getMasvendidos;
    bodyMasVendidosElem.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const tupla = crearTuplaMasVendidos(producto, i);
      bodyMasVendidosElem.insertAdjacentHTML("beforeend", tupla);
    }
    console.log("Productos  mas vendidos:", productos);
  } catch (error) {
    console.error("Error al cargar productos bajo stock:", error);
  }
}

// document.addEventListener("DOMContentLoaded", cargarProductosMasVendidos);
