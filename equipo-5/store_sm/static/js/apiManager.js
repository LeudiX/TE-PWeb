const URL_BASE = "http://127.0.0.1:8000/";

async function busqueda({ url, options }) {
  try {
    const res = await fetch(url, options);
    let data;

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      throw {
        status: res.status,
        message: res.statusText,
        body: data,
      };
    }
    return data;
  } catch (error) {
    console.log(error);
    let mistatus = 602;
    if (error instanceof TypeError) {
      mistatus = 600;
    }
    if (error instanceof SyntaxError) {
      mistatus = 601;
    }
    
    // Manejar 401/403 de forma genérica
    if(error.status === 401 || error.status === 403){
      const mensaje = {
        message: "Usted no está autorizado. Por favor, inicie sesión.",
        type: "error",
        duration: 5000,
        timestamp: Date.now(),
      };
      localStorage.setItem("ultimoMensaje", JSON.stringify(mensaje));
      location.reload();
    }
    
    throw {
      status: error?.status || mistatus,
      message: error.message,
      body: error?.body || { error: "Error de conexión" },
    };
  }
}

// Función LISTAR - maneja page, limit y paginate en query params
async function listar(model, { page, limit, paginate = true } = {}) {
  let url = `${URL_BASE}${model}/api/`;

  const urlParams = new URLSearchParams();
  if (page) urlParams.append("page", page);
  if (limit) urlParams.append("limit", limit);
  if (!paginate) urlParams.append("paginate", "false");

  if (urlParams.toString()) {
    url += `?${urlParams.toString()}`;
  }

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
  };

  return await busqueda({
    url,
    options: { method: "GET", headers },
  });
}

// Función CREAR - maneja automáticamente JSON vs FormData
async function crear(model, payload) {
  const url = `${URL_BASE}${model}/api/crear/`;
  const access = localStorage.getItem("access");

  let headers = {};
  let body;

  // Detectar si es FormData (para productos con imágenes)
  if (payload instanceof FormData) {
    body = payload;
    if (access) {
      headers.Authorization = `Bearer ${access}`;
    }
  } else {
    // Para JSON normal
    headers = {
      "Content-Type": "application/json",
      ...(access && { Authorization: `Bearer ${access}` }),
    };
    body = JSON.stringify(payload);
  }

  return await busqueda({
    url,
    options: { method: "POST", headers, body },
  });
}

// Función BUSCAR - siempre paginada, recibe query, page y limit
async function buscar(model, query, { page, limit } = {}) {
  let url = `${URL_BASE}${model}/api/buscar/`;

  const urlParams = new URLSearchParams();
  urlParams.append("query", query);
  if (page) urlParams.append("page", page);
  if (limit) urlParams.append("limit", limit);

  url += `?${urlParams.toString()}`;

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
  };

  return await busqueda({
    url,
    options: { method: "GET", headers },
  });
}

// Función DETALLES - recibe model y pk
async function detalles(model, pk) {
  const url = `${URL_BASE}${model}/api/detalles/${pk}/`;

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
  };

  return await busqueda({
    url,
    options: { method: "GET", headers },
  });
}

// Función ACTUALIZAR - recibe model, pk y payload
async function actualizar(model, pk, payload) {
  const url = `${URL_BASE}${model}/api/actualizar/${pk}/`;
  const access = localStorage.getItem("access");

  let headers = {};
  let body;

  // Detectar si es FormData
  if (payload instanceof FormData) {
    body = payload;
    if (access) {
      headers.Authorization = `Bearer ${access}`;
    }
  } else {
    headers = {
      "Content-Type": "application/json",
      ...(access && { Authorization: `Bearer ${access}` }),
    };
    body = JSON.stringify(payload);
  }

  return await busqueda({
    url,
    options: { method: "PATCH", headers, body },
  });
}

// Función ELIMINAR (individual) - recibe model y pk
async function eliminar(model, pk) {
  const url = `${URL_BASE}${model}/api/eliminar/${pk}/`;

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
  };

  return await busqueda({
    url,
    options: { method: "DELETE", headers },
  });
}

// Función ELIMINAR_VARIOS - recibe model y payload con IDs
async function eliminarVarios(model, payload) {
  const url = `${URL_BASE}${model}/api/eliminar/`;

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
  };

  return await busqueda({
    url,
    options: {
      method: "DELETE",
      headers,
      body: JSON.stringify(payload),
    },
  });
}

export const apiManager = {
  // Funciones principales
  listar,
  crear,
  buscar,
  detalles,
  actualizar,
  eliminar,
  eliminarVarios,

  // Aliases para compatibilidad
  getAll: (model) => listar(model, { paginate: false }),
  getPage: (model, { page, limit }) => listar(model, { page, limit }),
  getOne: (model, id) => detalles(model, id),
  deleteOne: (model, id) => eliminar(model, id),
  deleteMany: (model, payload) => eliminarVarios(model, payload),
  updateObj: (model, id, payload) => actualizar(model, id, payload),
  postObj: (model, payload) => crear(model, payload),
  getSerch: ({ model, page, limit, query }) =>
    buscar(model, query, { page, limit }),
};
