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

// Renderizar tabla
function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    products.slice(start, end).forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.unit}</td>
                <td>${product.purchasePrice}</td>
                <td>${product.salePrice}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <input type="checkbox" class="form-check-input">
                        <button class="btn btn-sm btn-light">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-light">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-light">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById("pageInfo").textContent = `Página ${page}`;
}

// Eventos de paginación
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(products.length / rowsPerPage)) {
        currentPage++;
        renderTable(currentPage);
    }
});

// Inicializar tabla
renderTable(currentPage);