import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager

/**
 * Rellena el select de productos en el formulario.
 */
export async function rellenarProductos() {
  const productoSelect = document.getElementById("producto");

  try {
    // Obtener productos desde tu API usando apiManager
    // Usamos paginate: false para obtener todos los productos sin paginación
    const data = await apiManager.listar("productos", { paginate: false });

    // Crear opciones dinámicamente
    data.forEach((prod) => {
      const option = document.createElement("option");
      option.value = prod.id; // usa el id del producto
      option.textContent = prod.nombre; // muestra el nombre
      option.dataset.cantidad = prod.cantidad;
      productoSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error rellenando productos:", error);
  }
}

// Ejecutar automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", rellenarProductos);
