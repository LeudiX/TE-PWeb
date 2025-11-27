// Funciones de validación individuales
export function validarNombre(nombre, formData = null) {
  if (!nombre) return "El nombre del producto es obligatorio";
  if (nombre.length < 2 || nombre.length > 20)
    return "El nombre debe tener entre 2 y 20 caracteres";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-_]+$/.test(nombre))
    return "El nombre solo puede contener letras, números, espacios, guiones y guiones bajos";

  const primeraLetra = nombre.charAt(0);
  if (!/^[A-ZÁÉÍÓÚÑ]/.test(primeraLetra))
    return "La primera letra del nombre debe ser mayúscula";

  return "";
}

export function validarPrecio(precio, formData = null) {
  if (!precio) return "El precio de compra es obligatorio";

  const precioNum = parseFloat(precio);
  if (isNaN(precioNum) || precioNum <= 0)
    return "El precio de compra debe ser un número mayor a 0";
  if (precioNum > 9999.99)
    return "El precio de compra no puede ser mayor a 9999.99";
  if (!/^\d+(\.\d{1,2})?$/.test(precio))
    return "El precio debe tener máximo 2 decimales";

  return "";
}

export function validarPrecioVenta(precio_venta, formData = null) {
  if (!precio_venta) return "El precio de venta es obligatorio";

  const precioVentaNum = parseFloat(precio_venta);
  if (isNaN(precioVentaNum) || precioVentaNum <= 0)
    return "El precio de venta debe ser un número mayor a 0";
  if (precioVentaNum > 9999.99)
    return "El precio de venta no puede ser mayor a 9999.99";
  if (!/^\d+(\.\d{1,2})?$/.test(precio_venta))
    return "El precio de venta debe tener máximo 2 decimales";

  // Validación dependiente del precio de compra
  if (formData) {
    const precio = formData.get("precio")?.toString().trim() || "";
    if (precio) {
      const precioNum = parseFloat(precio);
      if (precioVentaNum <= precioNum) {
        return "El precio de venta debe ser mayor al precio de compra";
      }
    }
  }

  return "";
}

export function validarCantidad(cantidad, formData = null) {
  if (!cantidad) return "El stock inicial es obligatorio";

  const cantidadNum = parseInt(cantidad);
  if (isNaN(cantidadNum) || cantidadNum < 0)
    return "El stock debe ser un número entero mayor o igual a 0";
  if (cantidadNum > 999999) return "El stock no puede ser mayor a 999,999";

  return "";
}

export function validarCategoria(categoria, formData = null) {
  if (!categoria) return "La categoría es obligatoria";
  if (isNaN(parseInt(categoria)))
    return "La categoría seleccionada no es válida";

  return "";
}

export function validarDescripcion(descripcion, formData = null) {
  if (!descripcion) return "La descripción es obligatoria";
  if (descripcion.length < 10)
    return "La descripción debe tener al menos 10 caracteres";
  if (descripcion.length > 1000)
    return "La descripción no puede exceder los 1000 caracteres";

  return "";
}

export function validarImagen(imagen, formData = null) {
  if (imagen && imagen.size > 0) {
    const tiposPermitidos = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!tiposPermitidos.includes(imagen.type)) {
      return "Solo se permiten imágenes JPEG, JPG, PNG, GIF o WebP";
    }

    const maxSize = 5 * 1024 * 1024;
    if (imagen.size > maxSize) {
      return "La imagen no puede ser mayor a 5MB";
    }
  }

  return "";
}

// Función principal que valida todos los campos
export function validarProducto(formData) {
  const errores = {};

  // Validar nombre
  const nombre = formData.get("nombre")?.toString().trim() || "";
  errores.nombre = validarNombre(nombre, formData);

  // Validar precio
  const precio = formData.get("precio")?.toString().trim() || "";
  errores.precio = validarPrecio(precio, formData);

  // Validar precio_venta
  const precio_venta = formData.get("precio_venta")?.toString().trim() || "";
  errores.precio_venta = validarPrecioVenta(precio_venta, formData);

  // Validar cantidad
  const cantidad = formData.get("cantidad")?.toString().trim() || "";
  errores.cantidad = validarCantidad(cantidad, formData);

  // Validar categoria
  const categoria = formData.get("categoria")?.toString().trim() || "";
  errores.categoria = validarCategoria(categoria, formData);

  // Validar descripcion
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  errores.descripcion = validarDescripcion(descripcion, formData);

  // Validar imagen
  const imagen = formData.get("imagen");
  errores.imagen = validarImagen(imagen, formData);

  // Eliminar propiedades vacías
  Object.keys(errores).forEach((key) => {
    if (!errores[key]) delete errores[key];
  });

  return errores;
}

// Función auxiliar para validar un campo específico
export function validarCampo(campo, valor, formData = null) {
  const validadores = {
    nombre: validarNombre,
    precio: validarPrecio,
    precio_venta: validarPrecioVenta,
    cantidad: validarCantidad,
    categoria: validarCategoria,
    descripcion: validarDescripcion,
    imagen: validarImagen,
  };

  const validador = validadores[campo];
  return validador ? validador(valor, formData) : "";
}
