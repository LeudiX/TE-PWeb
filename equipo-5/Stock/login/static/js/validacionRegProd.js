document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const precioCompra = document.getElementById("precioCompra");
    const precioVenta = document.getElementById("precioVenta");
    const unidad = document.getElementById("unidad");
    const categoria = document.getElementById("categoria");
    const estado = document.getElementById("estado");
    const codigo = document.getElementById("codigo");
    const descripcion = document.getElementById("descripcion");
    const btnRegistrar = document.querySelector(".btn.btn-success");

    // Deshabilitar el botón Registrar inicialmente
    btnRegistrar.disabled = true;

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

    // Validar el formulario
    const validarFormulario = () => {
        let esValido = true;

        // Validar nombre
        if (nombre.value.trim() === "") {
            esValido = false;
            mostrarError(nombre, "El nombre no puede estar vacío.");
        } else {
            limpiarError(nombre);
        }

        // Validar precio de compra
        if (!/^\d+(\.\d{1,2})?$/.test(precioCompra.value) || parseFloat(precioCompra.value) < 0) {
            esValido = false;
            mostrarError(precioCompra, "El precio de compra debe ser un número positivo.");
        } else {
            limpiarError(precioCompra);
        }

        // Validar precio de venta
        if (!/^\d+(\.\d{1,2})?$/.test(precioVenta.value) || parseFloat(precioVenta.value) < 0) {
            esValido = false;
            mostrarError(precioVenta, "El precio de venta debe ser un número positivo.");
        } else {
            limpiarError(precioVenta);
        }

        // Validar que el precio de compra sea menor que el precio de venta
        if (parseFloat(precioCompra.value) >= parseFloat(precioVenta.value)) {
            esValido = false;
            mostrarError(precioVenta, "El precio de venta debe ser mayor que el precio de compra.");
        } else if (precioVenta.value !== "" && precioCompra.value !== "") {
            limpiarError(precioVenta);
        }

        // Validar unidad
        if (unidad.value.trim() === "") {
            esValido = false;
            mostrarError(unidad, "La unidad no puede estar vacía.");
        } else {
            limpiarError(unidad);
        }

        // Validar categoría
        if (categoria.value === "") {
            esValido = false;
            mostrarError(categoria, "Debe seleccionar una categoría.");
        } else {
            limpiarError(categoria);
        }

        // Validar estado
        if (estado.value === "") {
            esValido = false;
            mostrarError(estado, "Debe seleccionar un estado.");
        } else {
            limpiarError(estado);
        }

        // Validar código
        if (codigo.value.trim() === "") {
            esValido = false;
            mostrarError(codigo, "El código no puede estar vacío.");
        } else {
            limpiarError(codigo);
        }

        // Validar descripción (1 a 50 caracteres)
        if (descripcion.value.trim().length < 1 || descripcion.value.trim().length > 50) {
            esValido = false;
            mostrarError(descripcion, "La descripción debe tener entre 1 y 50 caracteres.");
        } else {
            limpiarError(descripcion);
        }

        // Habilitar o deshabilitar el botón Registrar
        btnRegistrar.disabled = !esValido;
    };

    // Escuchar eventos en los campos del formulario
    [nombre, precioCompra, precioVenta, unidad, categoria, estado, codigo, descripcion].forEach((campo) => {
        campo.addEventListener("input", validarFormulario);
    });

    // Prevenir el envío del formulario si no es válido
    form.addEventListener("submit", (e) => {
        if (btnRegistrar.disabled) {
            e.preventDefault();
        }
    });
});