window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("views").addEventListener("change", function () {
    location.reload();
  });
});

let view = document.getElementById("views").value;

if (view == "inventory") {
  loadInventory();
} else if (view == "orders") {
  loadOrders();
} else if (view == "last-orders") {
} else if (view == "user-activity") {
}

async function loadInventory() {
  const response = await fetch("/pet_api");
  const data = await response.json();

  const inventory = [
    {
      "category": "available",
      "dog": 0,
      "cat": 0,
      "parrot": 0,
      "mice": 0,
      "rabbit": 0,
    },
    {
      "category": "adopt",
      "dog": 0,
      "cat": 0,
      "parrot": 0,
      "mice": 0,
      "rabbit": 0,
    },
    {
      "category": "pending",
      "dog": 0,
      "cat": 0,
      "parrot": 0,
      "mice": 0,
      "rabbit": 0,
    },
    {
      "category": "total",
      "dog": 0,
      "cat": 0,
      "parrot": 0,
      "mice": 0,
      "rabbit": 0,
    },
  ];

  var size = Object.keys(data).length - 1;

  for (let i = 0; i <= size; i++) {
    if (data[i]["category"]["id"] == 1) {
      inventory[3].dog += 1;
      console.log(data[i]);
      if (data[i]["status"] == "available") {
        inventory[0].dog += 1;
      } else if (data[i]["status"] == "adopted") {
        inventory[1].dog += 1;
      } else {
        inventory[2].dog += 1;
      }
    } else if (data[i]["category"]["id"] == 2) {
      inventory[3].cat += 1;
      if (data[i]["status"] == "available") {
        inventory[0].cat += 1;
      } else if (data[i]["status"] == "adopted") {
        inventory[1].cat += 1;
      } else {
        inventory[2].cat += 1;
      }
    } else if (data[i]["category"]["id"] == 3) {
      inventory[3].parrot += 1;
      if (data[i]["status"] == "available") {
        inventory[0].parrot += 1;
      } else if (data[i]["status"] == "adopted") {
        inventory[1].parrot += 1;
      } else {
        inventory[2].parrot += 1;
      }
    } else if (data[i]["category"]["id"] == 4) {
      inventory[3].mice += 1;
      if (data[i]["status"] == "available") {
        inventory[0].mice += 1;
      } else if (data[i]["status"] == "adopted") {
        inventory[1].mice += 1;
      } else {
        inventory[2].mice += 1;
      }
    } else if (data[i]["category"]["id"] == 5) {
      inventory[3].rabbit += 1;
      if (data[i]["status"] == "available") {
        inventory[0].rabbit += 1;
      } else if (data[i]["status"] == "adopted") {
        inventory[1].rabbit += 1;
      } else {
        inventory[2].rabbit += 1;
      }
    }
  }

  const div = document.createElement("div");
  div.id = "inventory-div";
  div.classList.add("jumbotron");

  const table = document.createElement("table");
  table.id = "inventory-table";
  table.classList.add("table");

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const th = document.createElement("th");
  th.scope = "column";
  th.textContent = "#";

  const thDog = document.createElement("th");
  thDog.scope = "column";
  thDog.textContent = "Dog";
  const thCat = document.createElement("th");
  thCat.scope = "column";
  thCat.textContent = "Cat";
  const thParrot = document.createElement("th");
  thParrot.scope = "column";
  thParrot.textContent = "Parrot";
  const thMice = document.createElement("th");
  thMice.scope = "column";
  thMice.textContent = "Mice";
  const thRabbit = document.createElement("th");
  thRabbit.scope = "column";
  thRabbit.textContent = "Rabbit";
  const thTotal = document.createElement("th");
  thTotal.scope = "column";
  thTotal.textContent = "Total";

  trHead.append(th);

  trHead.append(thDog);
  trHead.append(thCat);
  trHead.append(thParrot);
  trHead.append(thMice);
  trHead.append(thRabbit);
  trHead.append(thTotal);

  table.append(trHead);
  const tbody = document.createElement("tbody");

  for (let i = 0; i <= inventory.length - 1; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = inventory[i].category;
    const td2 = document.createElement("td");
    td2.textContent = inventory[i].dog;
    const td3 = document.createElement("td");
    td3.textContent = inventory[i].cat;
    const td4 = document.createElement("td");
    td4.textContent = inventory[i].parrot;
    const td5 = document.createElement("td");
    td5.textContent = inventory[i].mice;
    const td6 = document.createElement("td");
    td6.textContent = inventory[i].rabbit;
    const tdTotal = document.createElement("td");
    tdTotal.textContent =
      inventory[i].rabbit +
      inventory[i].dog +
      inventory[i].parrot +
      inventory[i].cat +
      inventory[i].mice;

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(tdTotal);
    tbody.append(tr);
  }

  table.append(tbody);
  div.append(table);
  document.body.append(div);
}

async function loadOrders() {
  const response = await fetch("/store/orders");
  const data = await response.json();

  const div = document.createElement("div");
  div.id = "inventory-div";
  div.classList.add("jumbotron");

  for (let i = 0; i <= data.length - 1; i++) {
    console.log(data[i]);

    const td1 = document.createElement("pre");
    td1.textContent = JSON.stringify(data[i]);

    div.append(td1);
  }
  document.body.append(div);
}
