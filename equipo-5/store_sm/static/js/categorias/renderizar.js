import { eliminar } from "./eliminar.js";
import { prepararEditar } from "./prepararEditar.js";
import { escuchar } from "./escuchar.js";

function crearTupla(item) {
  const tupla = `<tr>
                 <td class="td-nombre">${item.nombre}</td>
                 <td>${item.cantidad}</td>
                 <td>
                   <i class="bi bi-pencil-square editar" data-id="${item.id}"  title="Modificar" style="cursor:pointer; margin-right:8px;"></i>
                   <i class="bi bi-trash3 eliminar" data-id="${item.id}" title="Eliminar" style="cursor:pointer;"></i>
                 </td>
                 <td><input data-id="${item.id}" id="checkbox-categoria-${item.id}" type="checkbox" class="fila-check seleccionar"></td>
               </tr>`;
  return tupla;
}

export function renderizar(categorias) {
  const tbody = document.getElementById("cuerpoTabla");
  tbody.innerHTML = "";
  for (let item of categorias) {
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
}
