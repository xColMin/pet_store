window.onload = function () {
  getData();
};

async function placeOrder(pet) {
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
    alert(`${pet.name} has a new home!`);
  }

  const order = {
    "petId": pet["_id"],
    "userID": user,
    "shipDate": "2022-06-29T06:02:58.719Z",
    "status": "placed",
    "complete": true,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };

  const jsonResponse = await fetch("/store", options);
  const jsonData = await jsonResponse.json();

  const orderResponse = await fetch("/pet_api/sold", options);
  const orderData = await jsonResponse.json();
}

async function getData() {
  const response = await fetch("/pet_api");
  const data = await response.json();

  const root = document.createElement("div");
  root.classList.add("jumbotron");
  root.id = "catalog-jumbotron";

  const h1 = document.createElement("h1");
  h1.textContent = "Our celebritites:";
  root.append(h1);

  const row = document.createElement("div");
  row.classList.add("row");
  row.id = "catalog-row";

  for (item of data) {
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

    if (item.status == "available") {
      const buy = document.createElement("button");
      buy.textContent = "Adopt";
      buy.id = "catalog-btn";
      buy.data = item;
      buy.onclick = function () {
        placeOrder(buy.data);
        this.remove();
        price.remove();
        const sold = document.createElement("label");
        sold.textContent = `Adopted!`;
        sold.id = "sold-lab";
        subtitle.append(sold);
      };
      const price = document.createElement("label");
      price.textContent = `${item.price} $`;
      buy.append(price);
      subtitle.append(buy);
      subtitle.append(price);
    } else {
      const sold = document.createElement("label");
      sold.textContent = `Adopted!`;
      sold.id = "sold-lab";
      subtitle.append(sold);
    }

    figure.append(subtitle);
    row.append(figure);
  }

  root.append(row);
  document.body.append(root);
}
