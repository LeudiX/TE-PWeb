import { apiManager } from "../apiManager.js"; // Asegúrate de importar apiManager

export async function ver(e) {
  const modalElement = document.getElementById("viewProductModal");
  const modal = new bootstrap.Modal(modalElement);

  // Mostrar el modal
  modal.show();
  // ensure modal is visible if a d-none class was previously applied
  modalElement.classList.remove("d-none");

  const id = e.currentTarget?.dataset?.id;
  if (!id) {
    console.error("ver: no id found on event target");
    return;
  }

  try {
    // Usar apiManager.detalles en lugar de getProducto
    const data = await apiManager.detalles("productos", id);

    // Populate image if present (field may be 'foto', 'imagen', or 'imagen_url')
    const imgEl = document.getElementById("productImage");
    const imgSrc = data.foto || data.imagen || data.imagen_url || null;
    if (imgSrc) imgEl.src = imgSrc;

    // Populate details table
    const detailsTbody = document.getElementById("productDetailsList");
    detailsTbody.innerHTML = "";

    // Map of field key -> label to render in modal
    const fields = [
      ["id", "ID"],
      ["nombre", "Nombre"],
      ["categoria_nombre", "Categoría"],
      ["cantidad", "Unidades"],
      ["precio", "Precio Compra"],
      ["precio_venta", "Precio Venta"],
      ["descripcion", "Descripción"],
    ];

    for (const [key, label] of fields) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        const value = data[key];
        const row = document.createElement("tr");
        row.innerHTML = `<th class="text-end" style="width:35%">${label}</th><td class="text-start">${value}</td>`;
        detailsTbody.appendChild(row);
      }
    }

    // If no known fields were rendered, show full object as fallback
    if (!detailsTbody.hasChildNodes()) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="2"><pre style="white-space:pre-wrap">${JSON.stringify(
        data,
        null,
        2
      )}</pre></td>`;
      detailsTbody.appendChild(row);
    }
  } catch (err) {
    console.error("Error loading product details:", err);
    const detailsTbody = document.getElementById("productDetailsList");
    detailsTbody.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan=2 class=\"text-danger\">Error cargando los detalles del producto: ${
      err?.message || err
    }</td>`;
    detailsTbody.appendChild(row);
  }
}
