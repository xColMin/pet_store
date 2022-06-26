async function register() {
  const user = {
    "id": Date.now(),
    "username": document.getElementById("username").value,
    "firstName": document.getElementById("firstname").value,
    "lastName": document.getElementById("secondname").value,
    "email": document.getElementById("email").value,
    "password": document.getElementById("password").value,
    "phone": document.getElementById("phone").value,
    "userStatus": 0,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify(user),
  };

  const jsonResponse = await fetch("/user_api", options);
  const jsonData = await jsonResponse.json();
  console.log(jsonData);
  window.location.href = "login.html";
}
