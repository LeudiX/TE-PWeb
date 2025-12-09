import { manager } from "../api.js";

function showModal(modalEl) {
  if (!modalEl || !window.bootstrap) return;
  if (document.activeElement) document.activeElement.blur();
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  modalEl.querySelector(".btn-close")?.focus();
}

export async function renderizarMovimientos(productoId) {
  const body = document.getElementById("historial-body");
  const nombre = document.getElementById("historial-producto-nombre");
  const modalEl = document.getElementById("modalHistorial");

  try {
    const movimientos = (await manager.getMovimientosDe(productoId)) || [];
    body.innerHTML = movimientos.length
      ? movimientos
          .map((m, i) => {
            const f = new Date(m.fecha).toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            const tipo = m.tipo === "entrada" ? "Entrada" : "Salida";
            const cls =
              m.tipo === "entrada" ? "badge bg-success" : "badge bg-danger";
            return `<tr>
                      <td>${i + 1}</td>
                      <td>${f}</td>
                      <td><span class="${cls}">${tipo}</span></td>
                      <td>${m.cantidad}</td>
                    </tr>`;
          })
          .join("")
      : '<tr><td colspan="4" class="text-center text-muted">No hay movimientos</td></tr>';

    nombre.textContent = movimientos[0]?.producto || "";
    showModal(modalEl);
  } catch (e) {
    console.error(e);
    body.innerHTML =
      '<tr><td colspan="4" class="text-center text-danger">Error al cargar movimientos</td></tr>';
    showModal(modalEl);
  }
}
