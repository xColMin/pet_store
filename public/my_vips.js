window.onload = function () {
  getDataMyPets();
};

async function getDataMyPets() {
  const response = await fetch("/pet_api");
  const data = await response.json();

  const orderResponse = await fetch("/store/orders");
  const orderData = await orderResponse.json();

  const userResponse = await fetch("/is_login");
  const userData = await userResponse.json();

  var size = Object.keys(userData).length - 1;

  let userID = undefined;

  for (let i = 0; i <= size; i++) {
    if (userData[i]["userStatus"] == 1) {
      userID = userData[i]["_id"];
      break;
    }
  }

  let ids = [];

  size = Object.keys(orderData).length - 1;

  console.log(orderData);

  for (let j = size; j >= 0; j--) {
    console.log(j);
    console.log(orderData[j]);
    let removed = false;

    if (orderData[j]["userID"] == userID) {
      if (orderData[j]["status"] == "placed") {
        ids.push(orderData[j]["petId"]);
      }
    }
  }
  const root = document.createElement("div");
  root.classList.add("jumbotron");
  root.id = "catalog-jumbotron";

  const h1 = document.createElement("h1");
  h1.textContent = "My Adoptions";
  root.append(h1);

  const row = document.createElement("div");
  row.classList.add("row");
  row.id = "catalog-row";

  for (item of data) {
    if (ids.includes(item["_id"])) {
      const figure = document.createElement("figure");
      figure.id = "catalog-figure";

      const pic = document.createElement("img");
      pic.src = item.photoUrls[0].data;
      pic.id = "catalog-img";
      pic.width = 221;
      pic.height = 228;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = `${item.name}`;
      figcaption.id = "catalog-cap";

      const subtitle = document.createElement("figcaption");
      subtitle.id = "catalog-lab";

      figure.append(figcaption);
      figure.append(pic);

      const cancel = document.createElement("button");
      cancel.textContent = "Cancel";
      cancel.id = "catalog-cancel-btn";
      cancel.data = item;
      cancel.onclick = function () {
        cancelOrder(cancel.data);
        figure.remove();
      };
      const pending = document.createElement("label");
      pending.textContent = `Pending`;

      subtitle.append(cancel);
      cancel.append(pending);
      subtitle.append(pending);

      figure.append(subtitle);
      row.append(figure);
    }
  }

  root.append(row);
  document.body.append(root);
  ids = [];
}

async function cancelOrder(pet) {
  const response = await fetch("/is_login");
  const data = await response.json();

  var size = Object.keys(data).length - 1;

  let user = "No user logged in";

  for (let i = 0; i <= size; i++) {
    if (data[i]["userStatus"] == 1) {
      user = data[i]["_id"];
      break;
    }
  }

  if (user === "No user logged in") {
    alert(`Please Log in!`);
    return;
  } else {
    alert(`Your oder has been cancelled!`);
  }

  const order = {
    "petId": pet["_id"],
    "userID": user,
    "shipDate": Date.now(),
    "status": "cancelled",
    "complete": true,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };

  const jsonResponse = await fetch("/store/cancel", options);
  const jsonData = await jsonResponse.json();
}
