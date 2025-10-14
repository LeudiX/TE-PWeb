// ===========================
// HEADER Y MENÚ - DROPDOWNS
// ===========================

// Elementos principales
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const userMenu = document.getElementById("user-menu");
const userAccount = document.getElementById("user-account");
const dropdown = document.getElementById("dropdown");

// ---------------------------
// MENÚ HAMBURGUESA
// ---------------------------
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ---------------------------
// MENÚ DESPLEGABLE USUARIO (ESCRITORIO)
// ---------------------------
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

// ---------------------------
// AJUSTE AL CAMBIAR RESOLUCIÓN
// ---------------------------
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        // Ocultar menú hamburguesa si está activo
        navLinks.classList.remove("active");
        // Asegurar dropdown cerrado
        dropdown.classList.remove("show");
    }
});

// ---------------------------
// MENÚ MÓVIL "Mi Cuenta"
// ---------------------------
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

// ===========================
// INVENTARIO - DATOS SIMULADOS
// ===========================

const UMBRAL_BAJO = 5; // Umbral de alerta para bajo stock

const inventory = [
  { id: 1, nombre: "Laptop Dell XPS 13", categoria: "Computadoras", precio: 1200.00, stock: 10, vendidos: 18 },
  { id: 2, nombre: "MacBook Air M2", categoria: "Computadoras", precio: 1400.00, stock: 4, vendidos: 22 },
  { id: 3, nombre: "iPhone 14", categoria: "Teléfonos Móviles", precio: 950.00, stock: 3, vendidos: 50 },
  { id: 4, nombre: "Samsung Galaxy S23", categoria: "Teléfonos Móviles", precio: 850.00, stock: 12, vendidos: 30 },
  { id: 5, nombre: "Teclado Mecánico MK Pro", categoria: "Periféricos", precio: 120.00, stock: 2, vendidos: 8 },
  { id: 6, nombre: "Mouse Wireless Elite", categoria: "Periféricos", precio: 45.00, stock: 25, vendidos: 12 },
  { id: 7, nombre: "Auriculares Bose QuietComfort", categoria: "Auriculares", precio: 300.00, stock: 6, vendidos: 10 },
  { id: 8, nombre: "Auriculares HyperX Cloud", categoria: "Auriculares", precio: 90.00, stock: 1, vendidos: 7 },
  { id: 9, nombre: "Monitor 27\" 4K", categoria: "Periféricos", precio: 400.00, stock: 7, vendidos: 5 },
  { id: 10, nombre: "iPad Air", categoria: "Tablets", precio: 620.00, stock: 0, vendidos: 3 },
];

// ===========================
// UTILIDADES
// ===========================
function formatoMoneda(numero) {
    // Formatea número a moneda Euro con separadores
    return numero.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

// ===========================
// RENDER DE RESÚMENES
// ===========================
function renderResumenes(datos) {
    const totalUnidades = datos.reduce((s, p) => s + p.stock, 0);
    const totalSKUs = datos.length;
    const valorInventario = datos.reduce((s, p) => s + (p.precio * p.stock), 0);

    document.getElementById('total-unidades').textContent = totalUnidades;
    document.getElementById('total-skus').textContent = totalSKUs;
    document.getElementById('valor-inventario').textContent = formatoMoneda(valorInventario);
    document.getElementById('umbral-display').textContent = UMBRAL_BAJO;
}

// ===========================
// RENDER TABLA INVENTARIO
// ===========================
function renderTablaInventario(datos) {
    const tbody = document.querySelector('#tbl-inventario tbody');
    tbody.innerHTML = '';

    datos.forEach((p, idx) => {
        const valor = p.precio * p.stock;
        const tr = document.createElement('tr');

        const alerta = p.stock < UMBRAL_BAJO
            ? `<span class="badge bg-danger badge-low">Bajo stock (${p.stock})</span>`
            : `<span class="badge bg-success">OK</span>`;

        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>${p.precio.toFixed(2)}</td>
          <td>${p.stock}</td>
          <td>${alerta}</td>
          <td>${p.vendidos}</td>
          <td>${valor.toFixed(2)}</td>
        `;

        tbody.appendChild(tr);
    });
}

// ===========================
// RENDER TABLA BAJO STOCK
// ===========================
function renderTablaBajoStock(datos) {
    const tbody = document.querySelector('#tbl-bajo-stock tbody');
    tbody.innerHTML = '';

    const bajos = datos.filter(p => p.stock < UMBRAL_BAJO);

    if (bajos.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" class="text-center text-muted">No hay productos con stock bajo</td>`;
        tbody.appendChild(tr);
        return;
    }

    bajos.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>${p.stock}</td>
          <td>${p.precio.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ===========================
// RENDER TOP 5 VENDIDOS
// ===========================
function renderTop5Vendidos(datos) {
    const tbody = document.querySelector('#tbl-top5 tbody');
    tbody.innerHTML = '';

    const top5 = [...datos].sort((a, b) => b.vendidos - a.vendidos).slice(0, 5);

    if (top5.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" class="text-center text-muted">No hay datos de ventas</td>`;
        tbody.appendChild(tr);
        return;
    }

    top5.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>${p.vendidos}</td>
          <td>${p.stock}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ===========================
// INICIALIZACIÓN
// ===========================
function init() {
    renderResumenes(inventory);
    renderTablaInventario(inventory);
    renderTablaBajoStock(inventory);
    renderTop5Vendidos(inventory);
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', init);
