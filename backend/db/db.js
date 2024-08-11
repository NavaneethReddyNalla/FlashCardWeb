const mysql = require("mysql");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

function registerUser(username, password, callback) {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    pool.query(sql, [username, hashedPassword], (error, results) => {
      if (error) {
        console.error("Error registering user:", error);
        return callback(error);
      }
      callback(null, results);
    });
  });
}

function authenticateUser(username, password, callback) {
  const sql = "SELECT * FROM users WHERE username = ?";
  pool.query(sql, [username], (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return callback(error);
    }
    if (results.length === 0) {
      return callback(new Error("User not found"));
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return callback(new Error("Invalid password"));

      callback(null, user);
    });
  });
}

function insertFlashcard(userId, question, answer, category, callback) {
  const sql =
    "INSERT INTO flashcards (user_id, question, answer, category) VALUES (?, ?, ?, ?)";
  pool.query(sql, [userId, question, answer, category], (error, results) => {
    if (error) {
      console.error("Error inserting flashcard:", error);
      return callback(error);
    }
    callback(null, results);
  });
}

function getAllFlashcards(userId, callback) {
  const sql = "SELECT * FROM flashcards WHERE user_id = ?";
  pool.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching flashcards:", error);
      return callback(error);
    }
    callback(null, results);
  });
}

function updateFlashcard(userId, id, question, answer, category, callback) {
  const sql =
    "UPDATE flashcards SET question = ?, answer = ?, category = ? WHERE id = ? AND user_id = ?";
  pool.query(
    sql,
    [question, answer, category, id, userId],
    (error, results) => {
      if (error) {
        console.error("Error updating flashcard:", error);
        return callback(error);
      }
      callback(null, results);
    }
  );
}

function deleteFlashcard(userId, id, callback) {
  const sql = "DELETE FROM flashcards WHERE id = ? AND user_id = ?";
  pool.query(sql, [id, userId], (error, results) => {
    if (error) {
      console.error("Error deleting flashcard:", error);
      return callback(error);
    }
    callback(null, results);
  });
}

module.exports = {
  registerUser,
  authenticateUser,
  insertFlashcard,
  getAllFlashcards,
  updateFlashcard,
  deleteFlashcard,
};
