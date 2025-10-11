document.addEventListener('DOMContentLoaded', () => {
    // Datos simulados del producto que se va a modificar
    const producto = {
        nombre: "Laptop Dell XPS 13",
        precioCompra: 1000,
        precioVenta: 1300,
        unidad: "Unidad",
        categoria: "computadoras",
        estado: "disponible",
        codigo: "PROD001",
        descripcion: "Laptop Dell XPS 13 con procesador Intel i7 y 16GB RAM."
    };

    // Referencias a campos
    const form = document.querySelector('form');
    const nombre = document.getElementById("nombre");
    const precioCompra = document.getElementById("precioCompra");
    const precioVenta = document.getElementById("precioVenta");
    const unidad = document.getElementById("unidad");
    const categoria = document.getElementById("categoria");
    const estado = document.getElementById("estado");
    const codigo = document.getElementById("codigo");
    const descripcion = document.getElementById("descripcion");
    const btnGuardar = document.querySelector(".btn-guardar");
    const cancelarBtn = document.querySelector('button[type="button"]');

    // Precargar datos del producto
    nombre.value = producto.nombre;
    precioCompra.value = producto.precioCompra;
    precioVenta.value = producto.precioVenta;
    unidad.value = producto.unidad;
    categoria.value = producto.categoria;
    estado.value = producto.estado;
    codigo.value = producto.codigo;
    descripcion.value = producto.descripcion;

    // Deshabilitar botón inicialmente
    btnGuardar.disabled = true;

    // Función para mostrar mensajes de error
    const mostrarError = (campo, mensaje) => {
        let error = campo.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("div");
            error.classList.add("error-message");
            error.style.color = "red";
            error.style.fontSize = "12px";
            campo.parentNode.appendChild(error);
        }
        error.textContent = mensaje;
    };

    // Función para limpiar mensajes de error
    const limpiarError = (campo) => {
        const error = campo.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.textContent = "";
        }
    };

    // Validar formulario completo
    const validarFormulario = () => {
        let esValido = true;

        // Nombre
        if (nombre.value.trim() === "") {
            esValido = false;
            mostrarError(nombre, "El nombre no puede estar vacío.");
        } else {
            limpiarError(nombre);
        }

        // Precio de compra
        if (!/^\d+(\.\d{1,2})?$/.test(precioCompra.value) || parseFloat(precioCompra.value) < 0) {
            esValido = false;
            mostrarError(precioCompra, "El precio de compra debe ser un número positivo.");
        } else {
            limpiarError(precioCompra);
        }

        // Precio de venta
        if (!/^\d+(\.\d{1,2})?$/.test(precioVenta.value) || parseFloat(precioVenta.value) < 0) {
            esValido = false;
            mostrarError(precioVenta, "El precio de venta debe ser un número positivo.");
        } else {
            limpiarError(precioVenta);
        }

        // Precio de compra < precio de venta
        if (parseFloat(precioCompra.value) >= parseFloat(precioVenta.value)) {
            esValido = false;
            mostrarError(precioVenta, "El precio de venta debe ser mayor que el precio de compra.");
        } else if (precioVenta.value !== "" && precioCompra.value !== "") {
            limpiarError(precioVenta);
        }

        // Unidad
        if (unidad.value.trim() === "") {
            esValido = false;
            mostrarError(unidad, "La unidad no puede estar vacía.");
        } else {
            limpiarError(unidad);
        }

        // Categoría
        if (categoria.value === "") {
            esValido = false;
            mostrarError(categoria, "Debe seleccionar una categoría.");
        } else {
            limpiarError(categoria);
        }

        // Estado
        if (estado.value === "") {
            esValido = false;
            mostrarError(estado, "Debe seleccionar un estado.");
        } else {
            limpiarError(estado);
        }

        // Código
        if (codigo.value.trim() === "") {
            esValido = false;
            mostrarError(codigo, "El código no puede estar vacío.");
        } else {
            limpiarError(codigo);
        }

        // Descripción (1-50 caracteres)
        if (descripcion.value.trim().length < 1 || descripcion.value.trim().length > 50) {
            esValido = false;
            mostrarError(descripcion, "La descripción debe tener entre 1 y 50 caracteres.");
        } else {
            limpiarError(descripcion);
        }

        // Habilitar o deshabilitar botón
        btnGuardar.disabled = !esValido;
    };

    // Escuchar eventos en los campos
    [nombre, precioCompra, precioVenta, unidad, categoria, estado, codigo, descripcion].forEach(campo => {
        campo.addEventListener("input", validarFormulario);
    });

    // Cancelar: regresar o limpiar
    cancelarBtn.addEventListener("click", () => {
        if (confirm("¿Desea cancelar la modificación? Se perderán los cambios.")) {
            window.history.back();
        }
    });

    // Enviar formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (btnGuardar.disabled) return;

        alert(`Producto "${nombre.value}" modificado correctamente!`);
        // Aquí iría la lógica de guardar cambios en el backend
    });

    // Ejecutar validación inicial para activar botón si ya hay datos correctos
    validarFormulario();
});
