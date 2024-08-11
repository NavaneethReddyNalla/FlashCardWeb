const express = require("express");
const userRouter = express.Router();
const db = require("../db/db");

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({ message: "Username and password are required" });
  }

  db.registerUser(username, password, (error, results) => {
    if (error) {
      console.error("Error registering user:", error);
      return res.send({ message: "User already exists" });
    }
    res.send({ message: "User registered successfully" });
  });
});

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({ message: "Username and password are required" });
  }

  db.authenticateUser(username, password, (error, user) => {
    if (error) {
      console.error("Authentication failed:", error.message);
      return res.send({ message: "Authentication failed: " + error.message });
    }

    res.send({ message: "Login successful", userId: user.id });
  });
});

module.exports = userRouter;
