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
    var message = (document.getElementById("logHelp").textContent =
      "Succesfully logged in!");
    window.location.href = "index.html";

    const response = await fetch("/user_api/log_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        "username": username,
      }),
    });
  } else if (response.status == 500) {
    var message = (document.getElementById("logHelp").textContent =
      "Wrong Password");
  } else {
    var message = (document.getElementById("logHelp").textContent =
      "User not found. Please Sign In");
  }
}
