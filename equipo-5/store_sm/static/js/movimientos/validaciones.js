// Funciones de validación individuales para Movimientos
export function validarProductoMovimiento(producto, formData = null) {
  if (!producto) return "El producto es obligatorio";
  if (isNaN(parseInt(producto))) return "El producto seleccionado no es válido";
  return "";
}

export function validarFechaMovimiento(fecha, formData = null) {
  if (!fecha) return ""; // No es obligatoria, el backend pone la fecha actual

  const fechaSeleccionada = new Date(fecha);
  const fechaActual = new Date();

  if (fechaSeleccionada > fechaActual) return "La fecha no puede ser futura";
  return "";
}

export function validarTipoMovimiento(tipo, formData = null) {
  if (!tipo) return "El tipo de movimiento es obligatorio";
  if (!["entrada", "salida"].includes(tipo))
    return "El tipo de movimiento no es válido";
  return "";
}

export function validarCantidadMovimiento(cantidad, formData = null) {
  if (!cantidad) return "La cantidad es obligatoria";

  const cantidadNum = parseInt(cantidad);
  if (isNaN(cantidadNum) || cantidadNum <= 0)
    return "La cantidad debe ser un número entero mayor a 0";
  if (cantidadNum > 999999) return "La cantidad no puede ser mayor a 999,999";
  if (!/^\d+$/.test(cantidad))
    return "La cantidad debe ser un número entero válido";

  // Validación adicional: si es salida, no puede superar el stock disponible
  if (formData) {
    const tipo = formData.get("tipo")?.toString().trim() || "";
    const productoId = formData.get("producto")?.toString().trim() || "";

    if (tipo === "salida" && productoId) {
      const productoSelect = document.getElementById("producto");
      if (productoSelect) {
        const opcionSeleccionada = productoSelect.querySelector(
          `option[value="${productoId}"]`
        );

        if (opcionSeleccionada && opcionSeleccionada.dataset.cantidad) {
          const stockDisponible = parseInt(opcionSeleccionada.dataset.cantidad);
          if (cantidadNum > stockDisponible) {
            return `No hay suficiente stock. Stock disponible: ${stockDisponible}`;
          }
        }
      }
    }
  }

  return "";
}

// Función principal que valida todos los campos del movimiento
export function validarMovimiento(formData) {
  const errores = {};

  // Validar producto
  const producto = formData.get("producto")?.toString().trim() || "";
  errores.producto = validarProductoMovimiento(producto, formData);

  // Validar fecha
  const fecha = formData.get("fecha")?.toString().trim() || "";
  errores.fecha = validarFechaMovimiento(fecha, formData);

  // Validar tipo
  const tipo = formData.get("tipo")?.toString().trim() || "";
  errores.tipo = validarTipoMovimiento(tipo, formData);

  // Validar cantidad
  const cantidad = formData.get("cantidad")?.toString().trim() || "";
  errores.cantidad = validarCantidadMovimiento(cantidad, formData);

  // Eliminar propiedades vacías
  Object.keys(errores).forEach((key) => {
    if (!errores[key]) delete errores[key];
  });

  return errores;
}

// Función auxiliar para validar un campo específico de movimiento
export function validarCampoMovimiento(campo, valor, formData = null) {
  const validadores = {
    producto: validarProductoMovimiento,
    fecha: validarFechaMovimiento,
    tipo: validarTipoMovimiento,
    cantidad: validarCantidadMovimiento,
  };

  const validador = validadores[campo];
  return validador ? validador(valor, formData) : "";
}
