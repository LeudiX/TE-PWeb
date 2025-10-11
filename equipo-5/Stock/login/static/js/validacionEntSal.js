document.getElementById("movimientoForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const producto = document.getElementById("producto").value.trim();
    const fecha = document.getElementById("fecha").value;
    const tipo = document.getElementById("tipo").value;
    const cantidad = document.getElementById("cantidad").value;
  
    if (!producto || !fecha || !tipo || !cantidad) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    alert("Movimiento realizado correctamente.");
  });
  