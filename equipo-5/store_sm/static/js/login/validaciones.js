// --- Subfunciones pequeñas --- //

// Valida que el username no esté vacío y tenga longitud mínima
function validateUsername(value) {
  if (!value || value.trim() === "") {
    return { field: "username", error: "El username es obligatorio." };
  }
  if (value.length < 3) {
    return {
      field: "username",
      error: "El username debe tener al menos 3 caracteres.",
    };
  }
  if (value.length > 30) {
    return {
      field: "username",
      error: "El username no debe exceder 30 caracteres.",
    };
  }
  // Validar caracteres permitidos (opcional)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(value)) {
    return {
      field: "username",
      error: "Solo se permiten letras, números y guiones bajos (_).",
    };
  }
  return true;
}

// Valida la contraseña
function validatePassword(value) {
  if (!value || value.trim() === "") {
    return { field: "password", error: "La contraseña es obligatoria." };
  }
  if (value.length < 6) {
    return {
      field: "password",
      error: "La contraseña debe tener al menos 6 caracteres.",
    };
  }
  if (value.length > 50) {
    return {
      field: "password",
      error: "La contraseña no debe exceder 50 caracteres.",
    };
  }
  // Ejemplo de regla: debe contener al menos un número
  if (!/\d/.test(value)) {
    return {
      field: "password",
      error: "La contraseña debe incluir al menos un número.",
    };
  }
  // Ejemplo: al menos una letra mayúscula
  if (!/[A-Z]/.test(value)) {
    return {
      field: "password",
      error: "La contraseña debe incluir al menos una mayúscula.",
    };
  }
  return true;
}

// Valida confirmación de contraseña
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return {
      field: "confirm_password",
      error: "Debe confirmar la contraseña.",
    };
  }
  if (password !== confirmPassword) {
    return {
      field: "confirm_password",
      error: "Las contraseñas no coinciden.",
    };
  }
  return true;
}

// --- Función para validar campo individual --- //
function validateField(fieldName, value, formData = {}) {
  switch (fieldName) {
    case "username":
      return validateUsername(value);
    case "password":
      return validatePassword(value);
    case "confirm_password":
      return validateConfirmPassword(formData.password || "", value);
    default:
      return true;
  }
}

// --- Función principal de validación del formulario --- //
function validateRegisterForm(formData) {
  // formData es un objeto con {username, password, confirm_password}
  const usernameCheck = validateUsername(formData.username);
  if (usernameCheck !== true) return usernameCheck;

  const passwordCheck = validatePassword(formData.password);
  if (passwordCheck !== true) return passwordCheck;

  const confirmCheck = validateConfirmPassword(
    formData.password,
    formData.confirm_password
  );
  if (confirmCheck !== true) return confirmCheck;

  // Si todo está bien
  return true;
}

// --- Exportar --- //
export {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateRegisterForm,
  validateField,
};
