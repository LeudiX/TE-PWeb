import { asignarRol, eliminarUsuario } from "./asignarRol.js";

export function renderizarUsuarios(usuarios) {
  const users = usuarios.results;
  const tabla = document.getElementById("tabla_usuarios");
  tabla.innerHTML = "";

  for (let user of users) {
    // CORRECCIÓN: Usar el método correctamente
    tabla.insertAdjacentHTML("beforeend", crearTupla(user));
  }
  const botones = document.getElementsByClassName("asignar");
  console.log(botones);
  for (let boton of botones) {
    boton.addEventListener("click", (e) => asignarRol(e));
  }
  const botonesEliminar = document.getElementsByClassName("eliminar");
  console.log(botonesEliminar);
  for (let boton of botonesEliminar) {
    boton.addEventListener("click", (e) => eliminarUsuario(e));
  }
}

function crearTupla(user) {
  console.log(user);

  // CORRECCIÓN: Mostrar nombre completo correctamente
  const nombreCompleto = user.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user.username;

  // Obtener el rol actual del usuario (ajusta según tu estructura de datos)
  const rolActual = user.role || ""; // Usa la propiedad correcta

  // Crear las opciones con la selección predeterminada
  const opciones = `
    <option value="Almacenero" ${
      rolActual === "Almacenero" ? "selected" : ""
    }>Almacenero</option>
    <option value="Admin" ${
      rolActual === "Admin" ? "selected" : ""
    }>Administrador</option>
    <option value="Vendedor" ${
      rolActual === "Vendedor" ? "selected" : ""
    }>Vendedor</option>
  `;

  const resp = `<tr>
        <td>${nombreCompleto}</td>
        <td>
          <select id="value_rol_${user.id}">
            ${opciones}
          </select>
        </td>
        <td class="btn-area">
          <button class="btn btn-success btn-sm custom-btn asignar" data-id="${user.id}">Asignar</button>
        </td>
        <td class="btn-area">
          <button class="btn btn-danger btn-sm custom-btn eliminar " style="background-color: red;" data-id="${user.id}" data-name="${user.first_name} ${user.last_name}">Eliminar</button>
        </td>
      </tr>`;
  return resp;
}
