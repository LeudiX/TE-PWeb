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
            alert(`Ver: ${products[idx].name}`);
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
