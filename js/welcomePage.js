const btnCreateGroup = document.getElementById("createGroup");
const btnLogout = document.getElementById("logout");
const btnClose = document.getElementById("close");
const btngroupCreate = document.getElementById("create-group");
const editGroupBtn = document.getElementById("editGroup-display");
const editCloseBtn = document.getElementById("closeBtn");
const addUserBtn = document.getElementById("btn-add-user");

const token = localStorage.getItem("token");

const URL = "http://127.0.0.1:3000";

// Elements
const formEL = document.getElementById("form-el");
const divEl = document.getElementById("grp-modify");

btnCreateGroup.addEventListener("click", (e) => {
  e.preventDefault();
  formEL.classList.remove("card-model");
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  formEL.classList.add("card-model");
});

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Are you sure you want to logout😥");
  localStorage.clear();
  window.location.replace("http://127.0.0.1:8080/html/login.html");
});

btngroupCreate.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const groupName = document.getElementById("groupname").value;
    if (groupName) {
      await axios({
        method: "POST",
        url: `${URL}/api/v1/group/creategroup`,
        headers: { Authorization: token },
        data: { groupName },
      });
      document.getElementById("groupname").value = "";
      alert("Group Created successfully");
    } else {
      alert("Please enter your group name");
    }
  } catch (err) {
    console.log(`I am in group creating error block`, JSON.stringify(err));
  }
});

editGroupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert(
    "Before adding your friends to group make sure that they have signed up! Use their email-id to add them on your group🤟"
  );
  divEl.classList.remove("card-model");
});

editCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  divEl.classList.add("card-model");
});

const clearFields = () => {
  document.getElementById("groupname-add").value = document.getElementById(
    "email-joinee"
  ).value = "";
  document.getElementById("isAdmin").checked = false;
};

addUserBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const groupName = document.getElementById("groupname-add").value;
    const email = document.getElementById("email-joinee").value;
    const isAdmin = document.getElementById("isAdmin").checked;

    const response = await axios({
      method: "POST",
      url: `${URL}/api/v1/group/adduser`,
      headers: { Authorization: token },
      data: {
        groupName,
        email,
        isAdmin,
      },
    });

    console.log(response.status);

    if (response.status === 200) {
      alert("User added to your group");
      clearFields();
    } else if (response.status === 201) {
      alert("User status updated");
      clearFields();
    }
  } catch (err) {
    console.log(`I am in adduser error block ${JSON.stringify(err)}`);
  }
});

const groups = async () => {
  try {
    const groups = await axios({
      method: "GET",
      url: `${URL}/api/v1/group`,
      headers: { Authorization: token },
    });
    groups.data.data.forEach((group) => {
      renderGroups(group.groupName, group.id);
    });
  } catch (err) {
    console.log(`I am in groups error block ${JSON.stringify(err)}`);
  }
};

groups();

const renderGroups = (groupName, id) => {
  const groupContainer = document.querySelector(".box-group");

  const template = `<button style="margin-top: 10px;" data-id="${id}"  class="btn btn-outline-secondary" >${groupName}</button>`;

  return (groupContainer.innerHTML += template);
};
