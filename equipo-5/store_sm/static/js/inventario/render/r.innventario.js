import { manager } from "../api.js";
import { renderizarMovimientos } from "./r.movimientos.js";

const inventario = document.getElementById("inventario-completo");
function crearTuplaInventario(producto, idx) {
  const valorInventario = producto.precio_venta * producto.stock_actual;
  const alerta =
    producto.stock_actual < 5
      ? `<span class="badge bg-danger badge-low">Bajo stock (${producto.stock_actual})</span>`
      : `<span class="badge bg-success">OK</span>`;
  const row = `
        <tr>
          <td>${idx + 1}</td>
          <td>${producto.nombre}</td>
          <td>${producto.categoria}</td>
          <td>€${producto.precio_venta}</td>
          <td>${producto.stock_actual}</td>
          <td>${alerta}</td>
          <td>${producto.vendidos_mes}</td>
          <td>€${valorInventario}</td>
          <td><button class="btn btn-outline-secondary btn-sm visualizar" data-id="${
            producto.id
          }">
                <i class="bi bi-eye"></i>
              </button></td>
        </tr>
        `;
  return row;
}
export async function cargarInventarioCompleto(page = 1) {
  try {
    const data = await manager.getInventario(page);
    const productos = data.results;
    inventario.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const tupla = crearTuplaInventario(producto, i);
      inventario.insertAdjacentHTML("beforeend", tupla);
    }
    const btnsVer = document.getElementsByClassName("visualizar");
    for (let btn of btnsVer) {
      btn.addEventListener("click", async (e) => {
        const productoId = e.currentTarget.getAttribute("data-id");
        await renderizarMovimientos(productoId);
      });
    }
  } catch (error) {
    console.error("Error al cargar inventario completo:", error);
  }
}

// document.addEventListener("DOMContentLoaded", cargarInventarioCompleto);
