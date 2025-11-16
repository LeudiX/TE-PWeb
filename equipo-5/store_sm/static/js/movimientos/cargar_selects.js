import { getProductos } from "../productos/peticiones/getReallyAll.js";

/**
 * Rellena el select de productos en el formulario.
 */
export async function rellenarProductos() {
  const productoSelect = document.getElementById("producto");

  try {
    // Obtener productos desde tu API
    const productos = await getProductos();

    // Crear opciones dinámicamente
    productos.forEach((prod) => {
      const option = document.createElement("option");
      option.value = prod.id; // usa el id del producto
      option.textContent = prod.nombre; // muestra el nombre
      productoSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error rellenando productos:", error);
  }
}

// Ejecutar automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", rellenarProductos);
