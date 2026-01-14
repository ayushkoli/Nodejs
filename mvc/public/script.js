const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const locationInput = document.getElementById("location");

let editUserId = null;

// Load users
function loadUsers() {
  fetch("/users")
    .then((res) => res.json())
    .then((users) => {
      userList.innerHTML = "";

      users.forEach((user) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <div class="user-info">
            <strong>${user.name}</strong> | ${user.age || "-"} | ${
          user.location || "-"
        }
          </div>
          <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
        `;

        li.querySelector(".delete").onclick = () => deleteUser(user._id);
        li.querySelector(".edit").onclick = () => editUser(user);

        userList.appendChild(li);
      });
    })
    .catch((err) => console.log("Load error:", err));
}

// Add or Update user
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = {
    name: nameInput.value,
    age: ageInput.value,
    location: locationInput.value,
  };

  // UPDATE
  if (editUserId) {
    fetch(`/users/${editUserId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(() => {
      editUserId = null;
      userForm.reset();
      loadUsers();
    });
  }
  // CREATE
  else {
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(() => {
      userForm.reset();
      loadUsers();
    });
  }
});

// Edit user
function editUser(user) {
  nameInput.value = user.name;
  ageInput.value = user.age;
  locationInput.value = user.location;
  editUserId = user._id;
}

// Delete user
function deleteUser(id) {
  fetch(`/users/${id}`, { method: "DELETE" }).then(() => loadUsers());
}

// Initial load
loadUsers();
