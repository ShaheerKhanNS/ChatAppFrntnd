const btnLogin = document.getElementById("login");
const URL = "http://127.0.0.1:3000";

btnLogin.addEventListener("click", async (e) => {
  try {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await axios({
      method: "POST",
      url: `${URL}/api/v1/users/login`,
      data: {
        email,
        password,
      },
    });

    if (response.data.status === "success") {
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
});
