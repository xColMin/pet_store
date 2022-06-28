async function addPet() {
  let data = document.getElementById("b64").textContent;

  console.log("DATAAAAAAAA");
  console.log(typeof data);

  let id = Date.now();
  let name = document.getElementById("petname").value;
  const pet = {
    "category": {
      "id": id,
      "name": name,
    },
    "name": name,
    "photoUrls": [{ data }],
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
  //window.location.href = "index.html";
}
