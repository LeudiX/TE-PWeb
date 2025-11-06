export async function getProductos() {
  try {
    const res = await fetch("http://127.0.0.1:8000/productos/api/");
    const json = res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: res.statusText,
        body: json,
      };
    }
    return json;
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
