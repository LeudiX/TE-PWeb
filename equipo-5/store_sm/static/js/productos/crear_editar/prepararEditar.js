import { apiManager } from "../../apiManager.js"; // Asegúrate de importar apiManager

export function prepararEditar(e) {
  const id = e.currentTarget.dataset.id;
  console.log(id);
  if (id) {
    window.location.href = `/productos/modificar/?id=${id}`;
  }
}
