async function addPet() {
  let data = document.getElementById("b64").textContent;
  let category = document.getElementById("category").value;
  let price = document.getElementById("price").value;

  let name = document.getElementById("petname").value;
  const pet = {
    "category": {
      "id": category,
      "name": getCategory(category),
    },
    "name": name,
    "price": price,
    "photoUrls": [{ data }],
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
  const m = document.getElementById("message");
  m.textContent = "Pet Added!";
}

function getCategory(category) {
  if (category == 1) {
    return "Dog";
  } else if (category == 2) {
    return "Cat";
  } else if (category == 3) {
    return "Parrot";
  } else if (category == 4) {
    return "Mice";
  } else if (category == 5) {
    return "Rabbit";
  }
}

function readFile() {
  if (!this.files || !this.files[0]) return;

  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {
    document.querySelector("#img").src = evt.target.result;
    document.querySelector("#b64").textContent = evt.target.result;
  });

  FR.readAsDataURL(this.files[0]);
}

document.querySelector("#inp").addEventListener("change", readFile);
