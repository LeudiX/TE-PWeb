// ======= MENÚ HAMBURGUESA =======
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Nuevo: mover menú de usuario dentro del menú hamburguesa en responsive
const userMenu = document.getElementById("user-menu");
const dropdown = document.getElementById("dropdown");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Si está en responsive, metemos "Mi Cuenta" dentro del menú
    if (window.innerWidth <= 768) {
        if (!navLinks.contains(userMenu)) {
            navLinks.appendChild(userMenu);
            userMenu.style.display = "flex";
            userMenu.style.justifyContent = "center";
            userMenu.style.marginTop = "10px";
        }
    }
});

// ======= MENÚ DESPLEGABLE USUARIO =======
const userAccount = document.getElementById("user-account");

userAccount.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});

// Cerrar dropdown cuando se hace click fuera
document.addEventListener("click", (event) => {
    if (!userMenu.contains(event.target) && event.target !== userAccount) {
        dropdown.classList.remove("show");
    }
});

// Ajuste dinámico al cambiar el tamaño de la pantalla
window.addEventListener("resize", () => {
    // Cuando vuelve a escritorio devolvemos el menú de usuario a la derecha
    if (window.innerWidth > 768) {
        if (userMenu.parentElement !== document.getElementById("header")) {
            document.getElementById("header").appendChild(userMenu);
        }
        dropdown.classList.remove("show");
    }
});
