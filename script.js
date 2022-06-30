"use strict";

const fetch = require("node-fetch");
const express = require("express");
const { response, request } = require("express");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

const app = express();

// Database
const Datastore = require("nedb");

const database = new Datastore("database.db");
const userDatabase = new Datastore("user_database.db");
const storeDatabase = new Datastore("store_database.db");

logOutUsers();
database.loadDatabase();
userDatabase.loadDatabase();
storeDatabase.loadDatabase();

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/pet_api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/pet_api", async (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
  response.end();
  database.loadDatabase();
});

app.get("/user_api", (request, response) => {
  userDatabase.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/user_api", async (request, response) => {
  try {
    const data = request.body;
    const hashedPassword = await bcrypt.hash(data["password"], 10);
    data["password"] = hashedPassword;
    userDatabase.insert(data);
    response.json(data);
    response.end();
  } catch {
    response.status(500).send();
  }
});

app.post("/user_api/login", async (request, response) => {
  userDatabase.find({ "username": request.body.name }, function (err, docs) {
    if (docs.length != 0) {
      checkUser();

      async function checkUser(username, password) {
        const match = await bcrypt.compare(
          request.body.password,
          docs[0]["password"]
        );

        if (match) {
          response.status(300).send();
        } else {
          response.status(500).send();
        }
      }
    } else {
      response.status(400).send();
    }
  });
});

app.post("/user_api/log_user", async (request, response) => {
  userDatabase.find(
    { "username": request.body.username },
    function (err, docs) {
      let x = docs[0];
      userDatabase.update(
        { username: request.body.username },
        {
          "id": x["id"],
          "username": x["username"],
          "firstName": x["firstName"],
          "lastName": x["lastName"],
          "email": x["email"],
          "password": x["password"],
          "phone": x["phone"],
          "userStatus": 1,
          "_id": x["_id"],
        },
        {},
        function (err, numReplaced) {}
      );
      userDatabase.loadDatabase();
    }
  );
});

app.post("/user_api/logout_user", async (request, response) => {
  userDatabase.find({ userStatus: 1 }, function (err, docs) {
    var size = Object.keys(docs).length - 1;

    for (let i = 0; i <= size; i++) {
      let x = docs[i];
      userDatabase.update(
        { userStatus: 1 },
        {
          "id": x["id"],
          "username": x["username"],
          "firstName": x["firstName"],
          "lastName": x["lastName"],
          "email": x["email"],
          "password": x["password"],
          "phone": x["phone"],
          "userStatus": 0,
          "_id": x["_id"],
        },
        {},
        function (err, numReplaced) {}
      );
    }

    userDatabase.loadDatabase();
  });
});

app.get("/is_admin", (request, response) => {
  userDatabase.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get("/is_login", (request, response) => {
  userDatabase.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

function logOutUsers() {
  userDatabase.find({ userStatus: 1 }, function (err, docs) {
    var size = Object.keys(docs).length - 1;

    for (let i = 0; i <= size; i++) {
      let x = docs[i];
      userDatabase.update(
        { userStatus: 1 },
        {
          "id": x["id"],
          "username": x["username"],
          "firstName": x["firstName"],
          "lastName": x["lastName"],
          "email": x["email"],
          "password": x["password"],
          "phone": x["phone"],
          "userStatus": 0,
          "_id": x["_id"],
        },
        {},
        function (err, numReplaced) {}
      );
    }

    userDatabase.loadDatabase();
  });
}

app.post("/store", (request, response) => {
  const data = request.body;
  storeDatabase.insert(data);
  response.json(data);
  response.end();
  storeDatabase.loadDatabase();
});

app.post("/pet_api/sold", async (request, response) => {
  database.find({ "_id": request.body.petId }, function (err, docs) {
    let x = docs[0];
    database.update(
      { _id: request.body.petId },
      {
        "category": {
          "id": x["category"]["id"],
          "name": x["category"]["name"],
        },
        "name": x["name"],
        "price": x["price"],
        "photoUrls": x["photoUrls"],
        "status": "adopted",
      },
      {},
      function (err, numReplaced) {}
    );
    database.loadDatabase();
  });
});

app.get("/store/orders", (request, response) => {
  storeDatabase.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/store/cancel", async (request, response) => {
  storeDatabase.find({ "petId": request.body.petId }, function (err, docs) {
    let x = docs[0];
    storeDatabase.update(
      { petId: request.body.petId },
      {
        "petId": request.body.petId,
        "userID": x["userID"],
        "shipDate": Date.now(),
        "status": "cancelled",
        "complete": true,
        "_id": x["_id"],
      },
      {},
      function (err, numReplaced) {}
    );
    storeDatabase.loadDatabase();
  });

  database.find({ "_id": request.body.petId }, function (err, docs) {
    let x = docs[0];
    database.update(
      { _id: request.body.petId },
      {
        "category": {
          "id": x["category"]["id"],
          "name": x["category"]["name"],
        },
        "name": x["name"],
        "price": x["price"],
        "photoUrls": x["photoUrls"],
        "status": "available",
      },
      {},
      function (err, numReplaced) {}
    );
    database.loadDatabase();
  });
});

app.get("/store/inventory"),
  (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
  };
