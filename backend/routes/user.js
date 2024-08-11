const express = require("express");
const userRouter = express.Router();
const db = require("../db/db");

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  db.registerUser(username, password, (error, results) => {
    if (error) {
      console.error("Error registering user:", error);
      return res.status(500).send({ message: "User already exists" });
    }
    res.status(201).send({ message: "User registered successfully" });
  });
});

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  db.authenticateUser(username, password, (error, user) => {
    if (error) {
      console.error("Authentication failed:", error.message);
      return res
        .status(401)
        .send({ message: "Authentication failed: " + error.message });
    }

    res.status(200).send({ message: "Login successful", userId: user.id });
  });
});

module.exports = userRouter;
