async function addPet() {
  let id = Date.now();
  let name = document.getElementById("petname").value;
  const pet = {
    "category": {
      "id": id,
      "name": name,
    },
    "name": name,
    "photoUrls": [{ "profilePic": "string" }],
    "tags": [{ "id": id, "name": name }],
    "status": "available",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify(pet),
  };

  const jsonResponse = await fetch("/pet_api", options);
  const jsonData = await jsonResponse.json();
  console.log(jsonData);
  window.location.href = "index.html";
}
