// ======= MENÚ HAMBURGUESA =======
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Nuevo: mover menú de usuario dentro del menú hamburguesa en responsive
const userMenu = document.getElementById("user-menu");
const dropdown = document.getElementById("dropdown");

if(menuToggle) {
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
}

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

const formCategoria = document.querySelector("form");
const tablaCategorias = document.querySelector(".table-custom tbody");

formCategoria.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita el reinicio de página

    // Obtener valores del formulario
    const nombre = formCategoria.querySelector('input[type="text"]').value.trim();
    const cantidad = formCategoria.querySelector('input[type="number"]').value.trim();

    // Validación rápida
    if(nombre === "" || cantidad === ""){
        alert("Complete todos los campos antes de agregar.");
        return;
    }

    // Crear nueva fila
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>
            <i class="bi bi-pencil-square editar icono-accion"></i>
            <i class="bi bi-trash3 eliminar icono-accion"></i>
        </td>
        <td><input type="checkbox"></td>
    `;

    // Agregar a la tabla
    tablaCategorias.appendChild(nuevaFila);

    // Limpiar formulario
    formCategoria.reset();
});


function generarPaginacion(totalPaginas) {
  const paginacion = document.getElementById("paginacionTabla");
  paginacion.innerHTML = "";

  // Botón "Anterior"
  const liAnterior = document.createElement("li");
  liAnterior.className = `page-item ${paginaActual === 1 ? 'disabled' : ''}`;
  liAnterior.innerHTML = `<a class="page-link">Anterior</a>`;
  liAnterior.addEventListener("click", () => {
      if (paginaActual > 1) cambiarPagina(paginaActual - 1);
  });
  paginacion.appendChild(liAnterior);

  // Números de página
  for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link">${i}</a>`;
      li.addEventListener("click", () => cambiarPagina(i));
      paginacion.appendChild(li);
  }

  // Botón "Siguiente"
  const liSiguiente = document.createElement("li");
  liSiguiente.className = `page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`;
  liSiguiente.innerHTML = `<a class="page-link">Siguiente</a>`;
  liSiguiente.addEventListener("click", () => {
      if (paginaActual < totalPaginas) cambiarPagina(paginaActual + 1);
  });
  paginacion.appendChild(liSiguiente);
}


