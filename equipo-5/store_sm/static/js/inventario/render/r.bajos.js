import { manager } from "../api.js";

const bodyBajoStockElem = document.getElementById("body-bajo-stock");
function crearTuplaBajoStock(producto, idx) {
  const row = `
        <tr>
          <td>${idx + 1}</td>
          <td>${producto.nombre}</td>
          <td>${producto.categoria_nombre}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.precio}</td>
        </tr>
        `;
  return row;
}

export async function cargarProductosBajoStock() {
  try {
    const productos = await manager.getBajoStock;
    bodyBajoStockElem.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const tupla = crearTuplaBajoStock(producto, i);
      bodyBajoStockElem.insertAdjacentHTML("beforeend", tupla);
    }
  } catch (error) {
    console.error("Error al cargar productos bajo stock:", error);
  }
}

// document.addEventListener("DOMContentLoaded", cargarProductosBajoStock);
