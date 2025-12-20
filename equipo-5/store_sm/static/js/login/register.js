import { validateRegisterForm, validateField } from "./validaciones.js";

const formulario = document.getElementById("register-form");
console.log("formulario existe?", !!formulario);

// Inicializar validaciones
initializeFormValidation();

formulario.addEventListener("submit", handleSubmit);

const usuario = localStorage.getItem("user");
console.log(usuario);

// Función para inicializar las validaciones en tiempo real
function initializeFormValidation() {
  // Configurar eventos input para cada campo
  const campos = ["username", "password", "confirm_password"];

  campos.forEach((fieldName) => {
    const input = formulario.querySelector(`[name="${fieldName}"]`);
    if (input) {
      // Evento input para validación en tiempo real
      input.addEventListener("input", function (e) {
        validateAndShowField(fieldName, e.target.value, getFormData());
      });

      // Evento blur para validación al salir del campo
      input.addEventListener("blur", function (e) {
        validateAndShowField(fieldName, e.target.value, getFormData());
      });
    }
  });

  // También limpiar errores al empezar a escribir
  // formulario.addEventListener("input", function (e) {
  //   const fieldName = e.target.getAttribute("name");
  //   if (fieldName) {
  //     // Solo limpiar el error si el campo ya no está vacío
  //     if (e.target.value.trim() !== "") {
  //       const fieldError = document.querySelector(`[name="${fieldName}"]`);
  //       if (fieldError && fieldError.classList.contains("is-invalid")) {
  //         // Remover clase de error pero mantener validación
  //         clearFieldError(fieldName);
  //       }
  //     }
  //   }
  // });
}

// Obtener datos del formulario
function getFormData() {
  const formData = new FormData(formulario);
  return Object.fromEntries(formData);
}

// Validar un campo específico y mostrar error
function validateAndShowField(fieldName, value, formData) {
  const result = validateField(fieldName, value, formData);

  if (result.error) {
    showFieldError(fieldName, result.error);
    return false;
  } else {
    clearFieldError(fieldName);
    return true;
  }
}

// Mostrar mensaje de error en campo específico
function showFieldError(field, message) {
  const input = document.querySelector(`[name="${field}"]`);
  if (!input) return;

  // Añadir clase de error
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  // Buscar o crear elemento para mensaje de error
  let errorElement = input.parentElement.querySelector(".invalid-feedback");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "invalid-feedback";
    input.parentElement.appendChild(errorElement);
  }

  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// Limpiar error de un campo
function clearFieldError(field) {
  const input = document.querySelector(`[name="${field}"]`);
  if (!input) return;

  input.classList.remove("is-invalid");

  const errorElement = input.parentElement.querySelector(".invalid-feedback");
  if (errorElement) {
    errorElement.style.display = "none";
  }
}

// Limpiar todos los errores
function clearAllErrors() {
  const inputs = formulario.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid");
    const errorElement = input.parentElement.querySelector(".invalid-feedback");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  });
}

async function handleSubmit(e) {
  e.preventDefault();
  e.stopPropagation();

  // Limpiar errores previos
  clearAllErrors();

  const formData = getFormData();
  console.log(formData);

  // Validar todos los campos
  const validar = validateRegisterForm(formData);

  if (validar !== true) {
    // Mostrar error en el campo correspondiente
    showFieldError(validar.field, validar.error);

    // Enfocar el campo con error
    const fieldEl = document.querySelector(`[name="${validar.field}"]`);
    if (fieldEl) fieldEl.focus();

    // Mostrar toast de error
    showToast("Por favor, corrige los errores en el formulario", "error", 5000);
    return;
  }

  // Si pasa todas las validaciones, proceder con el envío
  const payload = {
    username: formData.username,
    password: formData.password,
  };
  console.log(payload);

  // Deshabilitar botón durante el envío
  const submitBtn = document.getElementById("register-button");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Registrando...";

  try {
    const res = await fetch(`http://127.0.0.1:8000/usuarios/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(res);

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      showToast("Error inesperado en el servidor", "error", 5000);
      console.error("Error parseando JSON:", parseError);
      return;
    }

    console.log(data);

    if (!res.ok) {
      console.log("ERROR AAAA", res.status, res.statusText);

      // Manejar errores específicos del servidor
      if (res.status === 400) {
        // Si el servidor devuelve errores de campo específicos
        if (data.username) {
          showFieldError("username", data.username[0]);
        }
        if (data.password) {
          showFieldError("password", data.password[0]);
        }
        showToast("Datos inválidos. Verifique el formulario.", "error", 5000);
      } else if (res.status === 401) {
        showToast("No autorizado. Inicie sesión.", "error", 5000);
      } else if (res.status === 403) {
        showToast("Acceso denegado.", "error", 5000);
      } else if (res.status === 500) {
        showToast("Error interno del servidor.", "error", 5000);
      } else {
        showToast("Error en el registro.", "error", 5000);
      }

      throw { data };
    }

    // Éxito en el registro
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    showToast("Usuario registrado correctamente", "success", 5000);

    // Opcional: Redirección después de un breve delay
    setTimeout(() => {
      window.location.href = "/principal/";
    }, 1500);
  } catch (error) {
    console.log(error);
    if (error.data) {
      const mensaje =
        error.data.detail ||
        error.data.error ||
        "No se pudo completar el registro.";
      showToast(mensaje, "error", 5000);
    } else {
      showToast("Error de conexión con el servidor.", "error", 5000);
    }
  } finally {
    // Rehabilitar botón
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Función para mostrar toast (debe estar definida en tu proyecto)
function showToast(message, type, duration) {
  console.log(`Toast [${type}]: ${message}`);
  // Aquí deberías tener tu implementación de toast
  // Ejemplo básico:
  //   alert(`${type.toUpperCase()}: ${message}`);
}
