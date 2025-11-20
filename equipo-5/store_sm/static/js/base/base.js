// ===========================
// ELEMENTOS PRINCIPALES (obtener de forma segura)
// ===========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const userMenu = document.getElementById("user-menu");
const userAccount = document.getElementById("user-account");
const dropdown = document.getElementById("dropdown");

// ===========================
// MENÚ HAMBURGUESA
// ===========================
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===========================
// MENÚ DESPLEGABLE USUARIO
// ===========================
if (userAccount && dropdown) {
  userAccount.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el click cierre inmediatamente
    dropdown.classList.toggle("show");
  });
}

// Cerrar dropdown al hacer click fuera (escritorio y móvil)
document.addEventListener("click", (event) => {
  if (userMenu && dropdown && !userMenu.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

// ===========================
// AJUSTE AL CAMBIAR RESOLUCIÓN
// ===========================
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navLinks) navLinks.classList.remove("active");
    if (dropdown) dropdown.classList.remove("show");
  }
});

// ===========================
// MENÚ MÓVIL "Mi Cuenta"
// ===========================
const miCuentaMobile = document.getElementById("mi-cuenta-mobile");
const dropdownMobile = document.getElementById("dropdown-mobile");

if (miCuentaMobile && dropdownMobile) {
  miCuentaMobile.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdownMobile.style.display =
      dropdownMobile.style.display === "block" ? "none" : "block";
  });

  // Cerrar dropdownMobile al hacer click fuera
  document.addEventListener("click", (e) => {
    if (
      !miCuentaMobile.contains(e.target) &&
      !dropdownMobile.contains(e.target)
    ) {
      dropdownMobile.style.display = "none";
    }
  });
}

// ===========================
// Mostrar toast genérico usable desde cualquier página
// ===========================
function showToast(message, type = "info", duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  toast.textContent = message || "";
  container.appendChild(toast);

  // auto ocultar
  setTimeout(() => {
    toast.style.animation = "toast-out 0.18s ease forwards";
    setTimeout(() => toast.remove(), 180);
  }, duration);
}

// ===========================
// Consumir y mostrar mensaje persistente (localStorage)
// ===========================
function consumeStoredToast() {
  try {
    const raw = localStorage.getItem("ultimoMensaje");
    console.log(raw);
    if (!raw) {
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("ultimoMensaje no es JSON válido:", err);
      localStorage.removeItem("ultimoMensaje");
      return;
    }

    const message = parsed.message || parsed.texto || parsed.text || "";
    const type = parsed.type || parsed.tipo || "info";

    if (message) showToast(message, type, 3000);

    // eliminar para que no reaparezca en próximas cargas
    localStorage.removeItem("ultimoMensaje");
  } catch (e) {
    console.error("Error leyendo ultimoMensaje:", e);
  }
}

// Ejecutar consumeStoredToast tanto si el DOM ya cargó como cuando lo haga
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", consumeStoredToast);
} else {
  // DOMContentLoaded ya ocurrió
  consumeStoredToast();
}
