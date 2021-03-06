const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Variable for database
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "John@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "Sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

// *  ==============   Routes  =================

//* ==== Root route ==========
app.get("/", (req, res) => {
  res.send(database.users);
});

// * ====== Signin Route ==============
app.post("/signin", (req, res) => {
  if (
    req.body.email == database.users[0].email &&
    req.body.password == database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(404).json("error loggin in");
  }
});

// * ====== Register Route ==============
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "124",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

// * ====== Profile Route ==============

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("Not found");
  }
});

// * ====== image Route ==============
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("Not found");
  }
});

// Server port
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/* 
/ --> res = this is working
/signin  --> POST = success/fail
/register  --> POST  = user
/profile/:userId  --> GET = user
/image  --> PUT  --> user

*/
