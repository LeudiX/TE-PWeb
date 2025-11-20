export function validarProducto(formData) {
  const errores = {};

  // Validar nombre
  const nombre = formData.get("nombre")?.toString().trim() || "";
  if (!nombre) {
    errores.nombre = "El nombre del producto es obligatorio";
  } else if (nombre.length < 2 || nombre.length > 20) {
    errores.nombre = "El nombre debe tener entre 2 y 20 caracteres";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-_]+$/.test(nombre)) {
    errores.nombre =
      "El nombre solo puede contener letras, números, espacios, guiones y guiones bajos";
  } else {
    // Validar que la primera letra sea mayúscula
    const primeraLetra = nombre.charAt(0);
    if (!/^[A-ZÁÉÍÓÚÑ]/.test(primeraLetra)) {
      errores.nombre = "La primera letra del nombre debe ser mayúscula";
    }
  }

  // Validar precio
  const precio = formData.get("precio")?.toString().trim() || "";
  if (!precio) {
    errores.precio = "El precio de compra es obligatorio";
  } else {
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      errores.precio = "El precio de compra debe ser un número mayor a 0";
    } else if (precioNum > 9999.99) {
      errores.precio = "El precio de compra no puede ser mayor a 9999.99";
    } else if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
      errores.precio = "El precio debe tener máximo 2 decimales";
    }
  }

  // Validar precio_venta
  const precio_venta = formData.get("precio_venta")?.toString().trim() || "";
  const precioNum = parseFloat(precio);
  if (!precio_venta) {
    errores.precio_venta = "El precio de venta es obligatorio";
  } else {
    const precioVentaNum = parseFloat(precio_venta);
    if (isNaN(precioVentaNum) || precioVentaNum <= 0) {
      errores.precio_venta = "El precio de venta debe ser un número mayor a 0";
    } else if (precioVentaNum > 9999.99) {
      errores.precio_venta = "El precio de venta no puede ser mayor a 9999.99";
    } else if (!/^\d+(\.\d{1,2})?$/.test(precio_venta)) {
      errores.precio_venta = "El precio de venta debe tener máximo 2 decimales";
    } else if (precio && precioVentaNum <= precioNum) {
      errores.precio_venta =
        "El precio de venta debe ser mayor al precio de compra";
    }
  }

  // Validar cantidad
  const cantidad = formData.get("cantidad")?.toString().trim() || "";
  if (!cantidad) {
    errores.cantidad = "El stock inicial es obligatorio";
  } else {
    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum) || cantidadNum < 0) {
      errores.cantidad = "El stock debe ser un número entero mayor o igual a 0";
    } else if (cantidadNum > 999999) {
      errores.cantidad = "El stock no puede ser mayor a 999,999";
    }
  }

  // Validar categoria
  const categoria = formData.get("categoria")?.toString().trim() || "";
  if (!categoria) {
    errores.categoria = "La categoría es obligatoria";
  } else if (isNaN(parseInt(categoria))) {
    errores.categoria = "La categoría seleccionada no es válida";
  }

  // Validar descripcion
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  if (!descripcion) {
    errores.descripcion = "La descripción es obligatoria";
  } else if (descripcion.length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres";
  } else if (descripcion.length > 1000) {
    errores.descripcion = "La descripción no puede exceder los 1000 caracteres";
  }

  // Validar imagen
  const imagen = formData.get("imagen");
  if (imagen && imagen.size > 0) {
    const tiposPermitidos = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!tiposPermitidos.includes(imagen.type)) {
      errores.imagen = "Solo se permiten imágenes JPEG, JPG, PNG, GIF o WebP";
    }

    const maxSize = 5 * 1024 * 1024;
    if (imagen.size > maxSize) {
      errores.imagen = "La imagen no puede ser mayor a 5MB";
    }
  }

  return errores;
}
