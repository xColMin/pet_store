async function getInfo() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  const json = {
    "name": username,
    "password": password,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json),
  };

  const response = await fetch("/user_api/login", options);
  console.log(response.status);

  if (response.status == 300) {
    var message = (document.getElementById("pleaseSignIn").textContent =
      "Succesfully logged in!");
    window.location.href = "index.html";
  } else if (response.status == 500) {
    var message = (document.getElementById("pleaseSignIn").textContent =
      "Wrong Password");
  } else {
    var message = (document.getElementById("pleaseSignIn").textContent =
      "Please Sign In");
  }
}
