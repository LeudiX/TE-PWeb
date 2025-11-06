export async function buscarCategorias(data, page = 1) {
  let query = "nada";
  if (data) {
    query = data;
  }
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/categorias/api/buscar/${query}/?page=${page}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: res.statusText,
        body: data,
      };
    }
    console.log(data);
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
