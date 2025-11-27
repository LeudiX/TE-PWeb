import { eliminar } from "./eliminar.js";
import { ver } from "./ver.js";
import { prepararEditar } from "./crear_editar/prepararEditar.js";
import { escuchar } from "./escuchar.js";

function crearTupla(item) {
  const tupla = `
                <td>${item.nombre}</td>
                <td>${item.categoria_nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio}</td>
                <td>${item.precio_venta}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <input type="checkbox" class="product-checkbox form-check-input seleccionar" data-id="${item.id}" data-stock="${item.cantidad}">
                        <button class="btn btn-sm btn-light row-edit editar" data-id="${item.id}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-light row-view ver" data-id="${item.id}" title="Ver"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-light row-delete eliminar" data-id="${item.id}" data-name="${item.nombre}" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </td>`;
  return tupla;
}

export function renderizar(productos) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";
  for (let item of productos) {
    tbody.insertAdjacentHTML("beforeend", crearTupla(item));
  }
  const btnsEliminar = document.getElementsByClassName("eliminar");
  for (let item of btnsEliminar) {
    item.addEventListener("click", (e) => eliminar(e));
  }

  const btnsEditar = document.getElementsByClassName("editar");
  for (let item of btnsEditar) {
    item.addEventListener("click", (e) => prepararEditar(e));
  }

  const checkBoxs = document.getElementsByClassName("seleccionar");
  for (let item of checkBoxs) {
    item.addEventListener("change", escuchar);
  }

  const btnsVer = document.getElementsByClassName("ver");
  for (let item of btnsVer) {
    item.addEventListener("click", (e) => ver(e));
  }
}
