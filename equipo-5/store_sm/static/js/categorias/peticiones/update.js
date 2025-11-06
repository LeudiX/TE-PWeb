export async function updateCategoria(payload) {
  try {
    const access = localStorage.getItem("access");
    const res = await fetch(
      `http://127.0.0.1:8000/categorias/api/actualizar/${payload.id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: res.statusText,
        body: data,
      };
    }
    return data;
  } catch (error) {
    let mistatus = 602;
    if (error instanceof TypeError) mistatus = 600;
    if (error instanceof SyntaxError) mistatus = 601;
    throw {
      status: error?.status || mistatus,
      message: error.message,
      body: error?.body || {},
    };
  }
}
