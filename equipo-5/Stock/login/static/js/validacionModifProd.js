document.addEventListener('DOMContentLoaded', () => {
    // Simulación: Datos cargados de BD
    const producto = {
        nombre: "Teclado Gamer RGB",
        precioCompra: 15.50,
        precioVenta: 25.99,
        unidad: "Unidad",
        categoria: "perifericos",
        estado: "disponible",
        codigo: "PROD456",
        descripcion: "Teclado mecánico retroiluminado RGB",
        imagen: "" // opcional
    };

    // Referencias
    const form = document.getElementById("formModificar");
    const nombre = document.getElementById("nombre");
    const precioCompra = document.getElementById("precioCompra");
    const precioVenta = document.getElementById("precioVenta");
    const unidad = document.getElementById("unidad");
    const categoria = document.getElementById("categoria");
    const estado = document.getElementById("estado");
    const codigo = document.getElementById("codigo");
    const descripcion = document.getElementById("descripcion");
    const imagen = document.getElementById("imagen");
    const btnGuardar = document.querySelector(".btn-guardar");
    const btnCancelar = document.querySelector(".btn-cancelar");

    // Precargar datos
    nombre.value = producto.nombre;
    precioCompra.value = producto.precioCompra;
    precioVenta.value = producto.precioVenta;
    unidad.value = producto.unidad;
    categoria.value = producto.categoria;
    estado.value = producto.estado;
    codigo.value = producto.codigo;
    descripcion.value = producto.descripcion;

    // Guardar cambios
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        alert(`✅ Producto modificado: ${formData.get("nombre")}`);
        // Aquí puedes enviar con fetch al backend si quieres
        // fetch('/ruta', { method: 'POST', body: formData })
    });

    // Cancelar
    btnCancelar.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas cancelar?")) {
            window.location.href = "listarProductos.html";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formModificar");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores
        const nombre = document.getElementById("nombre").value.trim();
        const precioCompra = document.getElementById("precioCompra").value.trim();
        const precioVenta = document.getElementById("precioVenta").value.trim();
        const unidad = document.getElementById("unidad").value.trim();
        const categoria = document.getElementById("categoria").value.trim();
        const estado = document.getElementById("estado").value.trim();
        const codigo = document.getElementById("codigo").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const imagen = document.getElementById("imagen").value.trim();

        // Validación de campos vacíos
        if (!nombre || !precioCompra || !precioVenta || !unidad || !categoria || !estado || !codigo || !descripcion || !imagen) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validación: precios no negativos
        if (precioCompra < 0 || precioVenta < 0) {
            alert("Los precios no pueden ser negativos.");
            return;
        }

        // Validación: unidad sin números ni caracteres especiales
        const regexUnidad = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!regexUnidad.test(unidad)) {
            alert("La unidad solo puede contener letras (sin números ni caracteres especiales).");
            return;
        }

        // Validación: descripción máximo 50 caracteres
        if (descripcion.length > 50) {
            alert("La descripción no puede tener más de 50 caracteres.");
            return;
        }

        // Validación imagen obligatoria
        const extensionesValidas = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!extensionesValidas.exec(imagen)) {
            alert("Solo se permiten archivos de imagen (JPG, JPEG, PNG o GIF).");
            return;
        }

        // Si todo está bien
        alert("✅ Producto modificado correctamente.");
        form.submit();
    });
});
