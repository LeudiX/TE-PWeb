const btnLogin = document.getElementById("auth-button");

btnLogin.addEventListener("click", submit);
password = document.getElementById("password");
user = document.getElementById("usuario");

function submit() {
  const validatedUser = validateUser(user.value);
  const validatedPasword = validatePassword(password.value);

  if (validatedUser && validatedPasword) {
    saveTokens({ username: user.value, password: password.value });
  }
}

function validateUser(data) {
  //   console.log(data);
  return true;
}

function validatePassword(data) {
  //   console.log(data);
  return true;
}

function saveTokens(data) {
  // console.log(data);
  async function getTokens(userData) {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("access: ", data.access);
      localStorage.setItem("access", data.access);
      localStorage.setItem("access", data.access);
      window.location.href = "/principal/";
    } else {
      console.log(data.detail);
    }
  }
  getTokens(data);
  // setTimeout(() => (window.location.href = "/"), 2000);
}
