const URL = "http://127.0.0.1:3000";

const btnSignup = document.getElementById("signup");

btnSignup.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phonenumber = document.getElementById("phonenumber").value;

    await axios({
      method: "POST",
      url: `${URL}/api/v1/users`,
      data: {
        name,
        email,
        password,
        phonenumber,
      },
    });
    alert("User Successfully created!");
  } catch (err) {
    document.body.innerHTML += `<p class="error container">User with given email or phone number exists,Try to login or use forgot password🚫</p>`;
  }
});
