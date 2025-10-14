document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // HEADER RESPONSIVE
    // =========================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const miCuentaMobile = document.getElementById('mi-cuenta-mobile');
    const dropdownMobile = document.getElementById('dropdown-mobile');
    miCuentaMobile && miCuentaMobile.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMobile.style.display = dropdownMobile.style.display === 'block' ? 'none' : 'block';
    });

    const userAccount = document.getElementById('user-account');
    const dropdownDesktop = document.getElementById('dropdown');
    userAccount && userAccount.addEventListener('mouseenter', () => dropdownDesktop.style.display = 'block');
    userAccount && userAccount.addEventListener('mouseleave', () => dropdownDesktop.style.display = 'none');

    // =========================
    // CANCELAR FORM
    // =========================
    const cancelarBtn = document.getElementById('cancelarBtn');
    cancelarBtn.addEventListener('click', () => {
        if (confirm('¿Desea cancelar el registro? Se perderán los datos.')) {
            window.history.back();
        }
    });

    // =========================
    // VALIDACIÓN FORMULARIO
    // =========================
    const form = document.getElementById('formProducto');
    const campos = {
        nombre: document.getElementById('nombre'),
        precioCompra: document.getElementById('precioCompra'),
        precioVenta: document.getElementById('precioVenta'),
        unidad: document.getElementById('unidad'),
        categoria: document.getElementById('categoria'),
        estado: document.getElementById('estado'),
        codigo: document.getElementById('codigo'),
        descripcion: document.getElementById('descripcion')
    };

    const errores = {};

    const mostrarError = (campo, mensaje) => {
        const errorDiv = campo.nextElementSibling;
        errorDiv.textContent = mensaje;
    };

    const limpiarError = (campo) => {
        const errorDiv = campo.nextElementSibling;
        errorDiv.textContent = '';
    };

    // Función para validar un campo individual
    const validarCampo = (campo) => {
        const value = campo.value.trim();
        switch (campo.id) {
            case 'nombre':
                if (value === '') return 'El nombre no puede estar vacío.';
                if (/[^a-zA-Z0-9\s]/.test(value)) return 'No puede contener caracteres especiales.';
                break;
            case 'precioCompra':
                if (value === '') return 'El precio de compra no puede estar vacío.';
                if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Debe ser un número válido.';
                if (campos.precioVenta.value && parseFloat(value) >= parseFloat(campos.precioVenta.value)) return 'Debe ser menor que el precio de venta.';
                break;
            case 'precioVenta':
                if (value === '') return 'El precio de venta no puede estar vacío.';
                if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Debe ser un número válido.';
                if (campos.precioCompra.value && parseFloat(value) <= parseFloat(campos.precioCompra.value)) return 'Debe ser mayor que el precio de compra.';
                break;
            case 'unidad':
                if (value === '') return 'La unidad no puede estar vacía.';
                if (/[^a-zA-Z0-9\s]/.test(value)) return 'No puede contener caracteres especiales.';
                break;
            case 'categoria':
                if (value === '') return 'Debe seleccionar una categoría.';
                break;
            case 'estado':
                if (value === '') return 'Debe seleccionar un estado.';
                break;
            case 'codigo':
                if (value === '') return 'El código no puede estar vacío.';
                // Simulación de código único: se puede usar un arreglo de códigos existentes
                break;
            case 'descripcion':
                if (value.length < 1 || value.length > 50) return 'Debe tener entre 1 y 50 caracteres.';
                break;
        }
        return '';
    };

    Object.values(campos).forEach(campo => {
        campo.addEventListener('input', () => {
            const mensaje = validarCampo(campo);
            if (mensaje) mostrarError(campo, mensaje);
            else limpiarError(campo);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formularioValido = true;
        Object.values(campos).forEach(campo => {
            const mensaje = validarCampo(campo);
            if (mensaje) {
                mostrarError(campo, mensaje);
                formularioValido = false;
            } else limpiarError(campo);
        });
        if (formularioValido) alert(`Producto "${campos.nombre.value}" registrado correctamente!`);
    });
});
