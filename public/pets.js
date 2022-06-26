// iterate over object json

/*
  var size = Object.keys(data).length;

  for (let i = 0; i <= size; i++) {
    console.log(data[i]);
  }
  */

// ISS EXAMPLE

const url = "https://petstore.swagger.io/v2/";

async function getAvailablePets() {
  const response = await fetch(url + "pet/findByStatus?status=available");
  const data = await response.json();

  let id = data[0]["id"];
  let name = data[0]["name"];
  let status = data[0]["status"];

  document.querySelector(".petsName").textContent = `name: ${name}`;
  document.querySelector(".petsId").textContent = `id: ${id}`;
  document.querySelector(".petsStatus").textContent = `status: ${status}`;

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
