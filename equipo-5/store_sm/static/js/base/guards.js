// static/js/base/guards.js
export function requireAuth(redirectTo = "/") {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = redirectTo;
      return false;
    }
    return user;
  } catch (e) {
    window.location.href = redirectTo;
    return false;
  }
}

export function requireRole(...allowedRoles) {
  const user = requireAuth();
  if (!user) return false;
  if (allowedRoles.length === 0) return user;
  if (!allowedRoles.includes(user.rol)) {
    localStorage.setItem(
      "ultimoMensaje",
      JSON.stringify({
        message: "No tiene permisos para acceder a esta página.",
        type: "error",
        duration: 3000,
        timestamp: Date.now(),
      })
    );
    window.location.href = "/principal/";
    return false;
  }
  return user;
}