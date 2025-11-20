export async function postCategoria(payload) {
  try {
    const access = localStorage.getItem("access");
    const res = await fetch("http://127.0.0.1:8000/categorias/api/crear/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: res.statusText,
        body: data,
      };
    }
    showToast("Categoria creada", "success", 2000);
    return data;
  } catch (error) {
    showToast("Datos incorrectos", "error", 3000);
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
