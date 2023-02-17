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

addUserBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const groupName = document.getElementById("groupname-add").value;
    const email = document.getElementById("email-joinee").value;
    const isAdmin = document.getElementById("isAdmin").checked;
    console.log(groupName, email, isAdmin);
  } catch (err) {
    console.log(`I am in adduser error block ${JSON.stringify(err)}`);
  }
});
