document.getElementById("movimientoForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const producto = document.getElementById("producto").value.trim();
    const fecha = document.getElementById("fecha").value;
    const tipo = document.getElementById("tipo").value;
    const cantidad = document.getElementById("cantidad").value;
  
    if (!producto || !fecha || !tipo || !cantidad) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    alert("Movimiento realizado correctamente.");
  });

  // Toggle menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle && menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Dropdown mobile "Mi cuenta"
const miCuentaMobile = document.getElementById('mi-cuenta-mobile');
const dropdownMobile = document.getElementById('dropdown-mobile');
miCuentaMobile && miCuentaMobile.addEventListener('click', (e) => {
  e.preventDefault();
  dropdownMobile.style.display = dropdownMobile.style.display === 'block' ? 'none' : 'block';
});

// Dropdown desktop "Mi cuenta"
const userAccount = document.getElementById('user-account');
const dropdownDesktop = document.getElementById('dropdown');
userAccount && userAccount.addEventListener('mouseenter', () => dropdownDesktop.style.display = 'block');
userAccount && userAccount.addEventListener('mouseleave', () => dropdownDesktop.style.display = 'none');
