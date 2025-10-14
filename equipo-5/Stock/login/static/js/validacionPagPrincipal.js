// ===========================
// ELEMENTOS PRINCIPALES
// ===========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const userMenu = document.getElementById("user-menu");
const userAccount = document.getElementById("user-account");
const dropdown = document.getElementById("dropdown");

// ===========================
// MENÚ HAMBURGUESA
// ===========================
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===========================
// MENÚ DESPLEGABLE USUARIO
// ===========================
userAccount.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el click cierre inmediatamente
    dropdown.classList.toggle("show");
});

// Cerrar dropdown al hacer click fuera (escritorio y móvil)
document.addEventListener("click", (event) => {
    if (!userMenu.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

// ===========================
// AJUSTE AL CAMBIAR RESOLUCIÓN
// ===========================
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        // Ocultar menú hamburguesa si está activo
        navLinks.classList.remove("active");
        // Asegurar dropdown cerrado
        dropdown.classList.remove("show");
    }
});

// ===========================
// MENÚ MÓVIL "Mi Cuenta"
// ===========================
const miCuentaMobile = document.getElementById('mi-cuenta-mobile');
const dropdownMobile = document.getElementById('dropdown-mobile');

if (miCuentaMobile) {
    miCuentaMobile.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMobile.style.display = dropdownMobile.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar dropdownMobile al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!miCuentaMobile.contains(e.target) && !dropdownMobile.contains(e.target)) {
            dropdownMobile.style.display = 'none';
        }
    });
}
