document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("formModificar");
    if (!form) return;

    const inputs = {
        nombre: document.getElementById("nombre"),
        precioCompra: document.getElementById("precioCompra"),
        precioVenta: document.getElementById("precioVenta"),
        unidad: document.getElementById("unidad"),
        categoria: document.getElementById("categoria"),
        estado: document.getElementById("estado"),
        codigo: document.getElementById("codigo"),
        descripcion: document.getElementById("descripcion"),
        imagen: document.getElementById("imagen")
    };

    // Obtener div de error por id
    function getErrorDiv(input) {
        if (!input) return null;
        const div = document.getElementById(`error-${input.id}`);
        if (div) return div;
        // fallback si no existe
        const newDiv = document.createElement("div");
        newDiv.classList.add("error-msg");
        newDiv.id = `error-${input.id}`;
        input.insertAdjacentElement("afterend", newDiv);
        return newDiv;
    }

    function markError(input) {
        input.classList.add("error");
        input.style.borderColor = "#dc3545";
    }
    function clearMark(input) {
        input.classList.remove("error");
        input.style.borderColor = "";
    }

    function clearErrors() {
        Object.values(inputs).forEach(input => {
            if (!input) return;
            clearMark(input);
            const div = getErrorDiv(input);
            if (div) div.textContent = "";
        });
    }

    // =======================
    // VALIDADORES
    // =======================
    function validarNombre() {
        const val = inputs.nombre.value.trim();
        const div = getErrorDiv(inputs.nombre);
        if (!val) { div.textContent = "El nombre es obligatorio."; markError(inputs.nombre); return false; }
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/;
        if (!regex.test(val)) { div.textContent = "El nombre no puede contener caracteres especiales."; markError(inputs.nombre); return false; }
        div.textContent = ""; clearMark(inputs.nombre); return true;
    }

    function validarPrecioCompra() {
        const valStr = inputs.precioCompra.value.trim();
        const val = parseFloat(valStr);
        const div = getErrorDiv(inputs.precioCompra);
        if (valStr === "") { div.textContent = "El precio de compra es obligatorio."; markError(inputs.precioCompra); return false; }
        if (isNaN(val) || val < 0) { div.textContent = "Debe ser un número positivo."; markError(inputs.precioCompra); return false; }
        const pv = parseFloat(inputs.precioVenta.value.trim()) || NaN;
        if (!isNaN(pv) && val >= pv) { div.textContent = "Debe ser menor al precio de venta."; markError(inputs.precioCompra); return false; }
        div.textContent = ""; clearMark(inputs.precioCompra); return true;
    }

    function validarPrecioVenta() {
        const valStr = inputs.precioVenta.value.trim();
        const val = parseFloat(valStr);
        const div = getErrorDiv(inputs.precioVenta);
        if (valStr === "") { div.textContent = "El precio de venta es obligatorio."; markError(inputs.precioVenta); return false; }
        if (isNaN(val) || val < 0) { div.textContent = "Debe ser un número positivo."; markError(inputs.precioVenta); return false; }
        const pc = parseFloat(inputs.precioCompra.value.trim()) || NaN;
        if (!isNaN(pc) && pc >= val) { div.textContent = "Debe ser mayor al precio de compra."; markError(inputs.precioVenta); return false; }
        div.textContent = ""; clearMark(inputs.precioVenta); return true;
    }

    function validarUnidad() {
        const val = inputs.unidad.value.trim();
        const div = getErrorDiv(inputs.unidad);
        if (!val) { div.textContent = "La unidad es obligatoria."; markError(inputs.unidad); return false; }
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!regex.test(val)) { div.textContent = "Solo letras permitidas."; markError(inputs.unidad); return false; }
        div.textContent = ""; clearMark(inputs.unidad); return true;
    }

    function validarCategoria() {
        const val = inputs.categoria.value.trim();
        const div = getErrorDiv(inputs.categoria);
        if (!val) { div.textContent = "Debes seleccionar una categoría."; markError(inputs.categoria); return false; }
        div.textContent = ""; clearMark(inputs.categoria); return true;
    }

    function validarEstado() {
        const val = inputs.estado.value.trim();
        const div = getErrorDiv(inputs.estado);
        if (!val) { div.textContent = "Debes seleccionar un estado."; markError(inputs.estado); return false; }
        div.textContent = ""; clearMark(inputs.estado); return true;
    }

    function validarCodigo() {
        const val = inputs.codigo.value.trim();
        const div = getErrorDiv(inputs.codigo);
        if (!val) { div.textContent = "El código es obligatorio."; markError(inputs.codigo); return false; }
        div.textContent = ""; clearMark(inputs.codigo); return true;
    }

    function validarDescripcion() {
        const val = inputs.descripcion.value.trim();
        const div = getErrorDiv(inputs.descripcion);
        if (!val) { div.textContent = "La descripción es obligatoria."; markError(inputs.descripcion); return false; }
        if (val.length < 1 || val.length > 50) { div.textContent = "1-50 caracteres."; markError(inputs.descripcion); return false; }
        div.textContent = ""; clearMark(inputs.descripcion); return true;
    }

    function validarImagen() {
        const file = inputs.imagen.files[0];
        const div = getErrorDiv(inputs.imagen);
        if (!file) { div.textContent = "Debes seleccionar una imagen."; markError(inputs.imagen); return false; }
        const ext = /\.(jpg|jpeg|png|gif)$/i;
        if (!ext.test(file.name)) { div.textContent = "Solo JPG, PNG, GIF."; markError(inputs.imagen); return false; }
        div.textContent = ""; clearMark(inputs.imagen); return true;
    }

    const validators = {
        nombre: validarNombre,
        precioCompra: validarPrecioCompra,
        precioVenta: validarPrecioVenta,
        unidad: validarUnidad,
        categoria: validarCategoria,
        estado: validarEstado,
        codigo: validarCodigo,
        descripcion: validarDescripcion,
        imagen: validarImagen
    };

    // =======
    // Validación en tiempo real
    // =======
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (!input) return;
        if (input.tagName === "SELECT" || input.type === "file") {
            input.addEventListener("change", () => validators[key]());
        } else {
            input.addEventListener("input", () => validators[key]());
        }
    });

    // =======
    // Validación al submit
    // =======
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();
        const allValid = Object.keys(validators).every(k => validators[k]());
        if (allValid) {
            alert("✅ Producto modificado correctamente.");
            form.submit();
        } else {
            const first = document.querySelector(".error");
            if (first) first.focus();
        }
    });
});



// ===========================
// HEADER Y MENÚ - DROPDOWNS
// ===========================
// Nota: protegemos con comprobaciones existencia para evitar excepciones que detengan el script.

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const userMenu = document.getElementById("user-menu");
const userAccount = document.getElementById("user-account");
const dropdown = document.getElementById("dropdown");

// MENÚ HAMBURGUESA (si existe)
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// MENÚ DESPLEGABLE USUARIO (ESCRITORIO)
if (userAccount && dropdown) {
    userAccount.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });
}

// Cerrar dropdown al hacer click fuera (si userMenu existe)
if (userMenu && dropdown) {
    document.addEventListener("click", (event) => {
        if (!userMenu.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
}

// AJUSTE AL CAMBIAR RESOLUCIÓN
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        if (navLinks) navLinks.classList.remove("active");
        if (dropdown) dropdown.classList.remove("show");
    }
});

// MENÚ MÓVIL "Mi Cuenta"
const miCuentaMobile = document.getElementById('mi-cuenta-mobile');
const dropdownMobile = document.getElementById('dropdown-mobile');

if (miCuentaMobile && dropdownMobile) {
    miCuentaMobile.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMobile.style.display = dropdownMobile.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        if (!miCuentaMobile.contains(e.target) && !dropdownMobile.contains(e.target)) {
            dropdownMobile.style.display = 'none';
        }
    });
}
