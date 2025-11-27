// validaciones.js - Funciones para Categorías

// Función de validación individual para el nombre de categoría
export function validarNombreCategoria(valor, formData = null) {
  if (typeof valor !== "string") return "Valor inválido.";
  const nombre = valor.trim();
  if (nombre.length === 0) return "El nombre no puede estar vacío.";
  if (nombre.length > 30) return "Máximo 30 caracteres (incluyendo espacios).";

  // Primera letra: letra mayúscula; resto: letras minúsculas o espacios.
  const regex = /^\p{Lu}[\p{L} ]{0,29}$/u;
  if (!regex.test(nombre)) {
    const primera = nombre.charAt(0);
    if (!/\p{Lu}/u.test(primera)) return "La primera letra debe ser mayúscula.";
    if (/[^\p{L} ]/u.test(nombre))
      return "No se permiten números ni caracteres especiales, solo letras y espacios.";
    return "Formato introducido inválido. Formato correcto: primera letra mayúscula, resto en minúsculas, sólo letras y espacios.";
  }
  return "";
}

// Función principal que valida todos los campos del formulario de categoría
export function validarCategoria(formData) {
  const errores = {};

  // Validar nombre
  const nombre = formData.get("nombre")?.toString().trim() || "";
  errores.nombre = validarNombreCategoria(nombre, formData);

  // Eliminar propiedades vacías
  Object.keys(errores).forEach((key) => {
    if (!errores[key]) delete errores[key];
  });

  return errores;
}

// Función auxiliar para validar un campo específico de categoría
export function validarCampoCategoria(campo, valor, formData = null) {
  const validadores = {
    nombre: validarNombreCategoria,
  };

  const validador = validadores[campo];
  return validador ? validador(valor, formData) : "";
}
