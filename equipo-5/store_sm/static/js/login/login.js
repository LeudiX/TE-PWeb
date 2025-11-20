const btnLogin = document.getElementById("auth-button");

btnLogin.addEventListener("click", submit);
const password = document.getElementById("password");
const user = document.getElementById("usuario");

function submit() {
  const validatedUser = validateUser(user.value);
  const validatedPasword = validatePassword(password.value);

  if (validatedUser && validatedPasword) {
    saveTokens({ username: user.value, password: password.value });
  }
}

function validateUser(data) {
  return true;
}

function validatePassword(data) {
  return true;
}

function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Guardar para que otras páginas puedan leerlo
  try {
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({ message, type, duration, timestamp: Date.now() })
    );
  } catch (e) {
    console.error("No se pudo guardar ultimoMensaje en localStorage", e);
  }

  // auto ocultar
  setTimeout(() => {
    toast.style.animation = "toast-out 0.18s ease forwards";
    setTimeout(() => toast.remove(), 180);
  }, duration);
}

// elimina el mensaje guardado (usar desde la página que lo consuma)
function clearLastMessage() {
  try {
    localStorage.removeItem("ultimoMensaje");
  } catch (e) {
    console.error("No se pudo eliminar ultimoMensaje", e);
  }
}

function saveTokens(data) {
  async function getTokens(userData) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const respData = await res.json();
      if (res.ok) {
        localStorage.setItem("access", respData.access);
        if (respData.refresh) localStorage.setItem("refresh", respData.refresh);
        // mostrar toast de éxito y redirigir después de un breve delay
        showToast("Inicio de sesión correcto", "success", 5000);
        window.location.href = "/principal/";
      } else {
        const message =
          respData.detail ||
          (respData.non_field_errors && respData.non_field_errors.join(", ")) ||
          "Credenciales inválidas";
        showToast(message, "error", 4000);
      }
    } catch (err) {
      console.error(err);
      showToast("Error de red. Intente de nuevo.", "error", 4000);
    }
  }
  getTokens(data);
}
