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

// validacionProductos.js
document.addEventListener('DOMContentLoaded', () => {

    // Datos de ejemplo
    const products = [
        { name: "MacBook Pro", category: "Computadoras", unit: "Unidad", purchasePrice: "$1500", salePrice: "$1999" },
        { name: "iPhone 13", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$800", salePrice: "$999" },
        { name: "Galaxy S22", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$700", salePrice: "$899" },
        { name: "AirPods Pro", category: "Auriculares", unit: "Unidad", purchasePrice: "$200", salePrice: "$249" },
        { name: "Logitech MX Master 3", category: "Periféricos", unit: "Unidad", purchasePrice: "$80", salePrice: "$99" },
        { name: "Surface Pro 8", category: "Computadoras", unit: "Unidad", purchasePrice: "$900", salePrice: "$1200" },
        { name: "Galaxy Tab S8", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$500", salePrice: "$699" },
        { name: "Sony WH-1000XM4", category: "Auriculares", unit: "Unidad", purchasePrice: "$300", salePrice: "$350" },
        { name: "Dell XPS 13", category: "Computadoras", unit: "Unidad", purchasePrice: "$1000", salePrice: "$1300" },
        { name: "JBL Flip 6", category: "Periféricos", unit: "Unidad", purchasePrice: "$100", salePrice: "$150" }
    ];

    let currentPage = 1;
    const rowsPerPage = 5;

    // Elementos del DOM
    const tableBody = document.getElementById("productTableBody");
    const selectAllCheckbox = document.getElementById("selectAll");
    const deleteSelectedBtn = document.getElementById("deleteSelected");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    // Navbar hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            menuToggle.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('open');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('open');
            }
        });
    }

    // Renderizar tabla
    function renderTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, products.length);

        tableBody.innerHTML = "";

        if (products.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No hay productos.</td></tr>`;
            pageInfo.textContent = `Página 0`;
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            deleteSelectedBtn.style.display = 'none';
            return;
        }

        products.slice(start, end).forEach((product, i) => {
            const globalIndex = start + i;
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.unit}</td>
                <td>${product.purchasePrice}</td>
                <td>${product.salePrice}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <input type="checkbox" class="product-checkbox form-check-input" data-index="${globalIndex}">
                        <button class="btn btn-sm btn-light row-edit" data-index="${globalIndex}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-light row-view" data-index="${globalIndex}" title="Ver"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-light row-delete" data-index="${globalIndex}" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Actualizar info de página
        const totalPages = Math.max(1, Math.ceil(products.length / rowsPerPage));
        pageInfo.textContent = `Página ${page} / ${totalPages}`;

        updateSelectAllState();
        toggleDeleteButton();
    }

    // Paginación
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(products.length / rowsPerPage)) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    // Seleccionar/deseleccionar todos
    selectAllCheckbox.addEventListener('change', () => {
        const pageCheckboxes = document.querySelectorAll('#productTableBody .product-checkbox');
        pageCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        updateSelectAllState();
        toggleDeleteButton();

        if (selectAllCheckbox.checked && pageCheckboxes.length > 0) {
            setTimeout(() => {
                const confirmed = confirm("¿Está seguro que desea eliminar todos los productos seleccionados?");
                if (confirmed) {
                    const indices = Array.from(pageCheckboxes).map(cb => Number(cb.dataset.index)).sort((a,b)=>b-a);
                    indices.forEach(i => products.splice(i, 1));
                    const maxPage = Math.max(1, Math.ceil(products.length / rowsPerPage));
                    if (currentPage > maxPage) currentPage = maxPage;
                    renderTable(currentPage);
                    alert("Productos eliminados correctamente.");
                } else {
                    selectAllCheckbox.checked = false;
                    pageCheckboxes.forEach(cb => cb.checked = false);
                }
            }, 50);
        }
    });

    // Detectar cambios en checkboxes individuales
    tableBody.addEventListener('change', (e) => {
        if (e.target && e.target.matches('.product-checkbox')) {
            updateSelectAllState();
            toggleDeleteButton();
        }
    });

    // Manejo de botones editar, ver, eliminar
    tableBody.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.row-delete');
        const editBtn = e.target.closest('.row-edit');
        const viewBtn = e.target.closest('.row-view');

        if (deleteBtn) {
            const idx = Number(deleteBtn.dataset.index);
            const confirmed = confirm(`¿Estás seguro de eliminar el producto "${products[idx].name}"?`);
            if (!confirmed) return;

            products.splice(idx, 1);
            const maxPage = Math.max(1, Math.ceil(products.length / rowsPerPage));
            if (currentPage > maxPage) currentPage = maxPage;
            renderTable(currentPage);
            return;
        }

        if (editBtn) {
            const idx = Number(editBtn.dataset.index);
            alert(`Editar: ${products[idx].name}`);
            return;
        }

        if (viewBtn) {
            const idx = Number(viewBtn.dataset.index);
            const product = products[idx];
        
            // Foto del producto
            const img = document.getElementById("productImage");
            img.src = product.image || 'default-image.jpg'; // Si no hay foto, puedes poner una por defecto
            img.alt = product.name;
        
            // Detalles del producto
            const detailsList = document.getElementById("productDetailsList");
            detailsList.innerHTML = `
              <tr><th>Nombre:</th><td>${product.name}</td></tr>
              <tr><th>Precio de Compra:</th><td>${product.purchasePrice}</td></tr>
              <tr><th>Precio de Venta:</th><td>${product.salePrice}</td></tr>
              <tr><th>Unidad de Medida:</th><td>${product.unit}</td></tr>
              <tr><th>Categoría:</th><td>${product.category}</td></tr>
              <tr><th>Estado:</th><td>${product.status}</td></tr>
              <tr><th>Código:</th><td>${product.code}</td></tr>
              <tr><th>Descripción:</th><td>${product.description}</td></tr>
            `;
        
            // Mostrar modal
            const viewModal = new bootstrap.Modal(document.getElementById('viewProductModal'));
            viewModal.show();
            return;
        }
        
        
    });

    // Mostrar/ocultar botón eliminar
    function toggleDeleteButton() {
        const checkedCount = document.querySelectorAll('#productTableBody .product-checkbox:checked').length;
        deleteSelectedBtn.style.display = checkedCount > 0 ? 'inline-block' : 'none';
    }

    // Actualiza estado checkbox "selectAll"
    function updateSelectAllState() {
        const pageCheckboxes = document.querySelectorAll('#productTableBody .product-checkbox');
        const checkedCount = document.querySelectorAll('#productTableBody .product-checkbox:checked').length;

        if (pageCheckboxes.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            return;
        }

        if (checkedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCount === pageCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }

    // Eliminar seleccionados con botón
    deleteSelectedBtn.addEventListener('click', () => {
        const checkedBoxes = Array.from(document.querySelectorAll('#productTableBody .product-checkbox:checked'));
        if (checkedBoxes.length === 0) {
            alert('Selecciona al menos un producto para eliminar.');
            return;
        }

        const confirmed = confirm(`¿Estás seguro de eliminar ${checkedBoxes.length} producto(s)?`);
        if (!confirmed) return;

        const indices = checkedBoxes.map(cb => Number(cb.dataset.index)).sort((a,b)=>b-a);
        indices.forEach(i => products.splice(i,1));

        const maxPage = Math.max(1, Math.ceil(products.length / rowsPerPage));
        if (currentPage > maxPage) currentPage = maxPage;

        renderTable(currentPage);
    });

    // Inicializar render
    renderTable(currentPage);

});

function renderProductRow(product) {
    return `
        <tr>
            <td>${product.nombre}</td>
            <td>${product.categoria}</td>
            <td>${product.unidad}</td>
            <td>${product.precioCompra}</td>
            <td>${product.precioVenta}</td>
            <td>
                <input type="checkbox" class="select-row">
                <a href="/Stock/login/templates/modificarProducto.html ?id=${product.id}" class="btn btn-warning btn-sm">
                    <i class="fas fa-edit"></i> Modificar
                </a>
            </td>
        </tr>
    `;
}


// validacionProductos.js
document.addEventListener('DOMContentLoaded', () => {

    // Datos de ejemplo (NO modifiqué tu listado original; solo añadí posibilidad de 'sku' opcional)
    const products = [
        { name: "MacBook Pro", category: "Computadoras", unit: "Unidad", purchasePrice: "$1500", salePrice: "$1999", sku: "MBP-001" },
        { name: "iPhone 13", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$800", salePrice: "$999", sku: "IP13-002" },
        { name: "Galaxy S22", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$700", salePrice: "$899", sku: "GS22-003" },
        { name: "AirPods Pro", category: "Auriculares", unit: "Unidad", purchasePrice: "$200", salePrice: "$249", sku: "APP-004" },
        { name: "Logitech MX Master 3", category: "Periféricos", unit: "Unidad", purchasePrice: "$80", salePrice: "$99", sku: "LGMX3-005" },
        { name: "Surface Pro 8", category: "Computadoras", unit: "Unidad", purchasePrice: "$900", salePrice: "$1200", sku: "SP8-006" },
        { name: "Galaxy Tab S8", category: "Teléfonos Móviles", unit: "Unidad", purchasePrice: "$500", salePrice: "$699", sku: "GTS8-007" },
        { name: "Sony WH-1000XM4", category: "Auriculares", unit: "Unidad", purchasePrice: "$300", salePrice: "$350", sku: "SONY-008" },
        { name: "Dell XPS 13", category: "Computadoras", unit: "Unidad", purchasePrice: "$1000", salePrice: "$1300", sku: "DX13-009" },
        { name: "JBL Flip 6", category: "Periféricos", unit: "Unidad", purchasePrice: "$100", salePrice: "$150", sku: "JBLF6-010" }
    ];

    // Nota: no cambié ni eliminé tus productos — solo agregué SKU a efectos de búsqueda por SKU.
    // Si no quieres estos sku en el array real, puedes quitar las propiedades sku sin afectar la búsqueda por nombre.

    let currentPage = 1;
    const rowsPerPage = 5;

    // Para búsqueda: mantenemos una lista filtrada
    let filteredProducts = products.slice();

    // Elementos del DOM
    const tableBody = document.getElementById("productTableBody");
    const selectAllCheckbox = document.getElementById("selectAll");
    const deleteSelectedBtn = document.getElementById("deleteSelected");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    // Navbar hamburguesa (mantengo tu lógica original para no romper nada)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            menuToggle.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('open');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('open');
            }
        });
    }

    // -------------------------
    // Funciones de apoyo para manejar índices reales
    // -------------------------
    // La idea: cuando estamos filtrando, las filas mostradas tienen que mapear al índice original de 'products'
    function getDisplayList() {
        // Devuelve lista de elementos con property originalIndex -> índice en `products`
        return filteredProducts.map(fp => {
            const originalIndex = products.indexOf(fp);
            return { __originalIndex: originalIndex, data: fp };
        });
    }

    // Renderizar tabla en base a filteredProducts y rowsPerPage
    function renderTable(page) {
        const displayList = getDisplayList();
        const totalPages = Math.max(1, Math.ceil(displayList.length / rowsPerPage));

        // Ajustar página actual si es necesario
        if (page > totalPages) page = totalPages;
        if (page < 1) page = 1;
        currentPage = page;

        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, displayList.length);

        tableBody.innerHTML = "";

        if (displayList.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No hay productos.</td></tr>`;
            pageInfo.textContent = `Página 0 / 0`;
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            deleteSelectedBtn.style.display = 'none';
            return;
        }

        for (let i = start; i < end; i++) {
            const item = displayList[i];
            const product = item.data;
            const globalIndex = item.__originalIndex; // índice real en 'products'
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.unit}</td>
                <td>${product.purchasePrice}</td>
                <td>${product.salePrice}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <input type="checkbox" class="product-checkbox form-check-input" data-index="${globalIndex}">
                        <button class="btn btn-sm btn-light row-edit" data-index="${globalIndex}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-light row-view" data-index="${globalIndex}" title="Ver"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-light row-delete" data-index="${globalIndex}" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        }

        pageInfo.textContent = `Página ${currentPage} / ${totalPages}`;
        updateSelectAllState();
        toggleDeleteButton();
    }

    // -------------------------
    // Paginación
    // -------------------------
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const displayList = getDisplayList();
        if (currentPage < Math.ceil(displayList.length / rowsPerPage)) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    // -------------------------
    // Seleccionar/deseleccionar todos (usa checkboxes de la página visible)
    // -------------------------
    selectAllCheckbox.addEventListener('change', () => {
        const pageCheckboxes = document.querySelectorAll('#productTableBody .product-checkbox');
        pageCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        updateSelectAllState();
        toggleDeleteButton();

        // Aviso: código original hacía confirm cuando seleccionabas todo. Mantuve esa confirmación.
        if (selectAllCheckbox.checked && pageCheckboxes.length > 0) {
            setTimeout(() => {
                const confirmed = confirm("¿Está seguro que desea eliminar todos los productos seleccionados?");
                if (confirmed) {
                    // Al eliminar varios, usamos los data-index que apuntan al índice real en products
                    const indices = Array.from(pageCheckboxes).map(cb => Number(cb.dataset.index)).sort((a,b)=>b-a);
                    indices.forEach(i => {
                        if (i >= 0 && i < products.length) products.splice(i, 1);
                    });
                    // Actualizar lista filtrada y renderizar
                    applySearch(searchInput.value.trim());
                    const maxPage = Math.max(1, Math.ceil(getDisplayList().length / rowsPerPage));
                    if (currentPage > maxPage) currentPage = maxPage;
                    renderTable(currentPage);
                    alert("Productos eliminados correctamente.");
                } else {
                    selectAllCheckbox.checked = false;
                    pageCheckboxes.forEach(cb => cb.checked = false);
                }
            }, 50);
        }
    });

    // Detectar cambios en checkboxes individuales (tabla)
    tableBody.addEventListener('change', (e) => {
        if (e.target && e.target.matches('.product-checkbox')) {
            updateSelectAllState();
            toggleDeleteButton();
        }
    });

    // Manejo de botones editar, ver, eliminar (usa índice real)
    tableBody.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.row-delete');
        const editBtn = e.target.closest('.row-edit');
        const viewBtn = e.target.closest('.row-view');
    
        if (deleteBtn) {
            const idx = Number(deleteBtn.dataset.index);
            if (idx < 0 || idx >= products.length) return;
            if (!confirm(`¿Estás seguro de eliminar el producto "${products[idx].name}"?`)) return;
            products.splice(idx, 1);
            applySearch(searchInput.value.trim());
            return;
        }
    
        if (editBtn) {
            const idx = Number(editBtn.dataset.index);
            window.location.href = `/Stock/login/templates/modificarProducto.html?id=${idx}`;
            return;
        }
    
        if (viewBtn) {
            const idx = Number(viewBtn.dataset.index);
            alert(`Ver: ${products[idx].name}`);
            return;
        }
    });
    

    // Mostrar/ocultar botón eliminar (seleccionados)
    function toggleDeleteButton() {
        const checkedCount = document.querySelectorAll('#productTableBody .product-checkbox:checked').length;
        deleteSelectedBtn.style.display = checkedCount > 0 ? 'inline-block' : 'none';
    }

    // Actualiza estado checkbox "selectAll"
    function updateSelectAllState() {
        const pageCheckboxes = document.querySelectorAll('#productTableBody .product-checkbox');
        const checkedCount = document.querySelectorAll('#productTableBody .product-checkbox:checked').length;

        if (pageCheckboxes.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            return;
        }

        if (checkedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCount === pageCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }

    // Eliminar seleccionados con botón
    deleteSelectedBtn.addEventListener('click', () => {
        const checkedBoxes = Array.from(document.querySelectorAll('#productTableBody .product-checkbox:checked'));
        if (checkedBoxes.length === 0) {
            alert('Selecciona al menos un producto para eliminar.');
            return;
        }

        const confirmed = confirm(`¿Estás seguro de eliminar ${checkedBoxes.length} producto(s)?`);
        if (!confirmed) return;

        const indices = checkedBoxes.map(cb => Number(cb.dataset.index)).sort((a,b)=>b-a);
        indices.forEach(i => {
            if (i >= 0 && i < products.length) products.splice(i,1);
        });

        applySearch(searchInput.value.trim());
        const maxPage = Math.max(1, Math.ceil(getDisplayList().length / rowsPerPage));
        if (currentPage > maxPage) currentPage = maxPage;

        renderTable(currentPage);
    });

    // -------------------------
    // BÚSQUEDA (en tiempo real y con botón)
    // -------------------------
    function applySearch(query) {
        if (!query) {
            filteredProducts = products.slice();
        } else {
            const q = query.toLowerCase();
            filteredProducts = products.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                // Busca en name o sku. Si quieres incluir más campos, aquí se añade.
                return name.includes(q) || sku.includes(q);
            });
        }
        // Después de filtrar, llevar a la página 1 para evitar páginas vacías
        currentPage = 1;
        renderTable(currentPage);
    }

    // Evento: input en tiempo real
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        applySearch(q);
    });

    // Evento: botón buscar
    searchButton.addEventListener('click', () => {
        const q = searchInput.value.trim();
        applySearch(q);
    });

    // Enter en input ejecuta búsqueda (previene recarga)
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applySearch(searchInput.value.trim());
        }
    });

    // -------------------------
    // Inicializar render
    // -------------------------
    applySearch(""); // carga inicial (copia productos -> filteredProducts y render)
});