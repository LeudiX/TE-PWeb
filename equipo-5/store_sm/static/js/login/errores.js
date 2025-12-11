// Muestra un error en el input identificado por name (ej: "username", "password", "confirm_password")
function showFieldError(field, message) {
  // Buscar input por name primero, si no existe buscar por id
  const input =
    document.querySelector(`[name="${field}"]`) ||
    document.getElementById(field);
  if (!input) return;

  // Evitar duplicados: si ya existe un mensaje, actualizarlo
  let feedback = input.parentElement.querySelector(
    ".invalid-feedback.custom-feedback"
  );
  if (!feedback) {
    // Añadir clase de error al input (Bootstrap usa is-invalid)
    input.classList.add("is-invalid");

    // Crear elemento de feedback
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback custom-feedback";
    // Asegurar que el mensaje sea accesible
    feedback.setAttribute("role", "alert");

    // Insertar después del input (o al final del contenedor)
    // Si el input está dentro de un grupo con iconos, lo colocamos al final del grupo
    input.parentElement.appendChild(feedback);
  }

  // Poner el texto del error
  feedback.textContent = message;

  // Opcional: enfocar el input para que el usuario lo vea
  try {
    input.focus();
  } catch (e) {}
}

// Limpia el error de un campo concreto
function clearFieldError(field) {
  const input =
    document.querySelector(`[name="${field}"]`) ||
    document.getElementById(field);
  if (!input) return;

  input.classList.remove("is-invalid");

  const feedback = input.parentElement.querySelector(
    ".invalid-feedback.custom-feedback"
  );
  if (feedback) feedback.remove();
}

// Limpia todos los errores del formulario (útil antes de revalidar)
function clearAllFieldErrors(formElement) {
  if (!formElement) formElement = document;
  const invalids = formElement.querySelectorAll(".is-invalid");
  invalids.forEach((el) => el.classList.remove("is-invalid"));

  const feedbacks = formElement.querySelectorAll(
    ".invalid-feedback.custom-feedback"
  );
  feedbacks.forEach((f) => f.remove());
}

// Conectar limpieza automática al escribir (llamar una vez al inicializar)
function attachAutoClearOnInput(formElement) {
  if (!formElement) formElement = document;
  formElement.addEventListener(
    "input",
    (e) => {
      const target = e.target;
      if (!target) return;
      const name = target.getAttribute("name") || target.id;
      if (name) clearFieldError(name);
    },
    { capture: true }
  );
}
