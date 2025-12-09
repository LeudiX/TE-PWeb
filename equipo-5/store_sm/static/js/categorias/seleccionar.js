export async function seleccionar(e) {
  console.log(e.target.checked);
  const otras = document.getElementsByClassName("seleccionar");
  const eliminarBtn = document.getElementById("btnEliminarSeleccionados");
  if (e.target.checked === true) {
    for (let item of otras) {
      item.checked = true;
    }
    if(eliminarBtn.classList.contains("d-none")){
    eliminarBtn.classList.remove("d-none");
  }
  
  } else {
    for (let item of otras) {
      item.checked = false;
    }
    if(!eliminarBtn.classList.contains("d-none")){
    eliminarBtn.classList.add("d-none");
  }
  }
}
