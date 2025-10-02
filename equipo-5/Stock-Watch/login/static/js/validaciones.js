// ================================
// VALIDACIONES PARA LOGIN EN TIEMPO REAL
// ================================

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos del formulario
    const form = document.getElementById('login-form'); // Formulario principal
    const usuario = document.getElementById('usuario'); // Campo de entrada para el usuario
    const password = document.getElementById('password'); // Campo de entrada para la contraseña

    // Crear contenedores para mensajes de error si no existen
    let userError = document.getElementById('user-error'); // Contenedor para el mensaje de error del usuario
    let passwordError = document.getElementById('password-error'); // Contenedor para el mensaje de error de la contraseña

    // Si no existe el contenedor de error del usuario, crearlo dinámicamente
    if (!userError) {
        userError = document.createElement('div'); // Crear un elemento <div>
        userError.id = 'user-error'; // Asignar un ID único
        userError.className = 'error-message'; // Asignar la clase para estilos
        usuario.parentNode.insertBefore(userError, usuario); // Insertar el mensaje antes del campo de entrada
    }

    // Si no existe el contenedor de error de la contraseña, crearlo dinámicamente
    if (!passwordError) {
        passwordError = document.createElement('div'); // Crear un elemento <div>
        passwordError.id = 'password-error'; // Asignar un ID único
        passwordError.className = 'error-message'; // Asignar la clase para estilos
        password.parentNode.insertBefore(passwordError, password); // Insertar el mensaje antes del campo de entrada
    }

    // --- VALIDACIÓN EN TIEMPO REAL DEL USUARIO ---
    usuario.addEventListener("input", () => {
        const regexUsuario = /^[a-z]{5}$/; // Expresión regular: exactamente 5 letras minúsculas

        // Si el campo está vacío, eliminar el mensaje de error y la clase de campo inválido
        if (usuario.value === "") {
            userError.textContent = ""; // Limpiar el mensaje de error
            usuario.classList.remove("is-invalid"); // Quitar la clase de error
        } 
        // Si el valor no cumple con la expresión regular, mostrar el mensaje de error
        else if (!regexUsuario.test(usuario.value)) {
            userError.textContent = "El usuario debe tener 5 letras minúsculas"; // Mensaje de error
            usuario.classList.add("is-invalid"); // Añadir la clase de error
        } 
        // Si el valor es válido, limpiar el mensaje de error y la clase de campo inválido
        else {
            userError.textContent = ""; // Limpiar el mensaje de error
            usuario.classList.remove("is-invalid"); // Quitar la clase de error
        }
    });

    // --- VALIDACIÓN EN TIEMPO REAL DE LA CONTRASEÑA ---
    password.addEventListener("input", () => {
        // Si el campo está vacío, eliminar el mensaje de error y la clase de campo inválido
        if (password.value === "") {
            passwordError.textContent = ""; // Limpiar el mensaje de error
            password.classList.remove("is-invalid"); // Quitar la clase de error
        } 
        // Si la contraseña no cumple con los requisitos, mostrar el mensaje de error
        else if (
            password.value.length < 6 || // Mínimo 6 caracteres
            !/\d/.test(password.value) || // Al menos 1 número
            !/[A-Z]/.test(password.value) // Al menos 1 letra mayúscula
        ) {
            passwordError.textContent = "Mínimo 6 caracteres, 1 número y 1 mayúscula"; // Mensaje de error
            password.classList.add("is-invalid"); // Añadir la clase de error
        } 
        // Si la contraseña es válida, limpiar el mensaje de error y la clase de campo inválido
        else {
            passwordError.textContent = ""; // Limpiar el mensaje de error
            password.classList.remove("is-invalid"); // Quitar la clase de error
        }
    });

    // --- VALIDACIÓN FINAL AL ENVIAR ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        let isValid = true; // Bandera para verificar si el formulario es válido

        // Validar el campo de usuario
        if (usuario.value === "" || !/^[a-z]{7}$/.test(usuario.value)) {
            userError.textContent = "El usuario debe tener 7 letras minúsculas"; // Mensaje de error
            usuario.classList.add("is-invalid"); // Añadir la clase de error
            isValid = false; // Marcar el formulario como inválido
        }

        // Validar el campo de contraseña
        if (
            password.value === "" || // Campo vacío
            password.value.length < 6 || // Menos de 6 caracteres
            !/\d/.test(password.value) || // Sin números
            !/[A-Z]/.test(password.value) // Sin mayúsculas
        ) {
            passwordError.textContent = "Mínimo 6 caracteres, 1 número y 1 mayúscula"; // Mensaje de error
            password.classList.add("is-invalid"); // Añadir la clase de error
            isValid = false; // Marcar el formulario como inválido
        }

        // Si el formulario es válido, mostrar un mensaje de éxito y enviarlo
        if (isValid) {
            alert("¡Login exitoso! 🚀"); // Mensaje de éxito
            form.submit(); // Enviar el formulario
        }
    });
});
