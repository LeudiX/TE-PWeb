// api.js
const BASE_URL = "/movimientos/api"; // Django expone tus endpoints bajo /api/

// Función genérica para hacer peticiones
async function request(endpoint, { method = "GET", body, headers } = {}) {
  const token = localStorage.getItem("access"); // aquí guardaste tu token al autenticar

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // 🔑 o "Token" según tu backend
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", // opcional si usas cookies de sesión
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    // Si la respuesta es vacía (ej. DELETE 204), no intentes parsear JSON
    if (res.status === 204) return null;

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Endpoints específicos para movimientos
export const api = {
  listarMovimientos: () => request("/"),

  crearMovimiento: (data) =>
    request("/crear/", {
      method: "POST",
      body: data,
    }),

  actualizarMovimiento: (id, data) =>
    request(`/actualizar/${id}/`, {
      method: "PUT",
      body: data,
    }),

  eliminarMovimiento: (id) =>
    request(`/eliminar/${id}/`, {
      method: "DELETE",
    }),

  detalleMovimiento: (id) => request(`/detail/${id}/`),
};
