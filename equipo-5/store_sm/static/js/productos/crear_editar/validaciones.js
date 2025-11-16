/**Validaciones para nombres de categoría.*/

/** Valida el nombre de categoría y devuelve una cadena vacía si es válido
 * o un mensaje de error en caso contrario.
 *
 * @param {string} valor
 * @returns {string} '' si válido, mensaje de error si inválido
 */

export function validarNombreProducto(valor) {
  if (typeof valor !== "string") return "Valor inválido.";
  const nombre = valor.trim();
  if (nombre.length === 0) return "El nombre no puede estar vacío.";
  if (nombre.length > 30) return "Máximo 30 caracteres (incluyendo espacios).";

  // Primera letra: letra mayúscula; resto: letras minúsculas o espacios.
  // ^\p{Lu}           -> primera letra mayúscula (Unicode)
  // [\p{Ll} ]{0,29}$  -> resto son letras minúsculas o espacios, hasta completar 30 chars
  const regex = /^\p{Lu}[\p{Ll} ]{0,29}$/u;
  if (!regex.test(nombre)) {
    // Proporcionar mensajes más específicos según el fallo detectado
    // 1) Si la primera letra no es mayúscula
    const primera = nombre.charAt(0);
    if (!/\p{Lu}/u.test(primera)) return "La primera letra debe ser mayúscula.";

    // 2) Si hay números o caracteres no permitidos
    if (/[^\p{L} ]/u.test(nombre))
      return "No se permiten números ni caracteres especiales, solo letras y espacios.";

    // 3) Si hay mayúsculas en el resto de la cadena
    const resto = nombre.slice(1);
    if (/\p{Lu}/u.test(resto))
      return "Sólo la primera letra puede ser mayúscula.";

    // Mensaje genérico por si algo más falla
    return "Formato introducido inválido. Formato correcto: primera letra mayúscula, resto en minúsculas, sólo letras y espacios.";
  }
  return "";
}
