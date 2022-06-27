// iterate over object json

/*
  var size = Object.keys(data).length;

  for (let i = 0; i <= size; i++) {
    console.log(data[i]);
  }
  */

// ISS EXAMPLE

async function getAvailablePets() {
  const response = await fetch("/pet_api");
  const data = await response.json();

  let name = data[0]["name"];
  let status = data[0]["status"];
  let picture = data[0]["photoUrls"][0];

  document.querySelector(".petsName").textContent = `${name}`;
  document.querySelector(".petsStatus").textContent = `${status}`;
  document.querySelector("#picture").src = picture;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data[0]),
  };

  const jsonResponse = await fetch("/api", options);
  const jsonData = await jsonResponse.json();
}

getAvailablePets().catch((error) => {
  console.log(error);
});
