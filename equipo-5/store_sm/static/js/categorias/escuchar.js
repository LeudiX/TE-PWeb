export function escuchar() {
  const otras = document.getElementsByClassName("seleccionar");
  const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
  const checkBoxAll = document.getElementById("seleccionarTodo");
  let count = 0;
  console.log(otras.length);
  for (let item of otras) {
    if (item.checked === true) {
      count++;
      if (eliminarBtn.classList.contains("d-none")) {
        eliminarBtn.classList.remove("d-none");
      }
    }
  }
  if (count === otras.length) {
    checkBoxAll.checked = true;
  }
  if (count === 0) {
    eliminarBtn.classList.add("d-none");
  }
  if (count > 0 && count < otras.length) {
    checkBoxAll.checked = false;
  }
}
