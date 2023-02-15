const URL = "http://127.0.0.1:3000";
// Buttons
const btnSend = document.getElementById("btn-submit");

const token = localStorage.getItem("token");

btnSend.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const message = document.getElementById("message").value;
    if (message) {
      await axios({
        method: "POST",
        url: `${URL}/api/v1/message`,
        headers: { Authorization: token },
        data: { message },
      });
      document.getElementById("message").value = "";
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
});

const renderTemplate = (message) => {
  const template = ` <div class="container send">
          <p>${message}</p>
        </div>`;
  const chatBox = document.querySelector(".main_div");
  return (chatBox.innerHTML += template);
};

const retrieveMessages = async () => {
  try {
    const messages = await axios({
      method: "GET",
      url: `${URL}/api/v1/message`,
      headers: { Authorization: token },
    });

    // To clear the previous clutter
    const chatBox = document.querySelector(".main_div");
    chatBox.innerHTML = "";

    messages.data.data.forEach((data) => {
      renderTemplate(data.message);
    });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

window.addEventListener("DOMContentLoaded", retrieveMessages);
setInterval(retrieveMessages, 1000);
