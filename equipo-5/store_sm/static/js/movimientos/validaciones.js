export function validarMovimiento(formData) {
  const errores = {};

  // Validar producto
  const producto = formData.get("producto")?.toString().trim() || "";
  if (!producto) {
    errores.producto = "El producto es obligatorio";
  } else if (isNaN(parseInt(producto))) {
    errores.producto = "El producto seleccionado no es válido";
  }

  // Validar fecha
  const fecha = formData.get("fecha")?.toString().trim() || "";
  const fechaSeleccionada = new Date(fecha);
  const fechaActual = new Date();

  if (fechaSeleccionada > fechaActual) {
    errores.fecha = "La fecha no puede ser futura";
  }

  // Validar tipo
  const tipo = formData.get("tipo")?.toString().trim() || "";
  if (!tipo) {
    errores.tipo = "El tipo de movimiento es obligatorio";
  } else if (!["entrada", "salida"].includes(tipo)) {
    errores.tipo = "El tipo de movimiento no es válido";
  }

  // Validar cantidad
  const cantidad = formData.get("cantidad")?.toString().trim() || "";
  if (!cantidad) {
    errores.cantidad = "La cantidad es obligatoria";
  } else {
    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      errores.cantidad = "La cantidad debe ser un número entero mayor a 0";
    } else if (cantidadNum > 999999) {
      errores.cantidad = "La cantidad no puede ser mayor a 999,999";
    } else if (!/^\d+$/.test(cantidad)) {
      errores.cantidad = "La cantidad debe ser un número entero válido";
    }
  }

  return errores;
}
