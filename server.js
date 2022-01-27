const express = require("express");

const app = express();

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

//* ==== Home route ==========
app.get("/", (req, res) => {
  res.send("This is working");
});

// * ====== Signin Route ==============
app.post("/signin", (req, res) => {
  if (
    req.body.email == database.users[0].email &&
    req.body.password == database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error loggin in");
  }
});

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
