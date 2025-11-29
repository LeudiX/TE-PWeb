export async function request({ endpoint, data = null }) {
  const url = `/inventario/api/${endpoint}${data ? data : ""}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function requestInventario({ page = 1 }) {
  const url = `/inventario/api/?page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const manager = {
  getInventario: (page) => requestInventario({ page }),
  getMasvendidos: request({ endpoint: "masvendidos/" }),
  getBajoStock: request({ endpoint: "bajostock/" }),
  getResumen: request({ endpoint: "resumen/" }),
  getMovimientosDe: (data) => request({ endpoint: "movimientos/", data }),
};
