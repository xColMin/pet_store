async function addPet() {
  let data = document.getElementById("b64").textContent;
  let category = document.getElementById("category").value;
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;

  let id = Date.now();
  let name = document.getElementById("petname").value;
  const pet = {
    "category": {
      "id": category,
      "name": getCategory(category),
    },
    "name": name,
    "price": price,
    "photoUrls": [{ data }],
    "tags": [{ "id": id, "name": name }],
    "status": [{ "available": quantity, "pending": 0, "sold": 0 }],
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
