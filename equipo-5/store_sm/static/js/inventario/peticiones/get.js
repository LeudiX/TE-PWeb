export async function getCategorias() {
  try {
    const res = await fetch("http://127.0.0.1:8000/categorias/api/");
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}
