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

database.loadDatabase();
userDatabase.loadDatabase();
//database.insert({ name: "Gumersindo", id: 1, status: "sold" });
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
  response.end();
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
