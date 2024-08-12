const express = require("express");
const cardRouter = express.Router();
const db = require("../db/db");

function checkUserId(req, res, next) {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ message: "User ID is required" });
  }
  next();
}

cardRouter.post("/", checkUserId, (req, res) => {
  const { userId, question, answer, category } = req.body;
  if (!question || !answer) {
    return res.json({ message: "Question and answer are required" });
  }
  db.insertFlashcard(userId, question, answer, category, (error, results) => {
    if (error) {
      console.error("Error inserting flashcard:", error);
      return res.json({ message: "Error creating flashcard" });
    }
    res.status(201).json({ message: "Flashcard created successfully" });
  });
});

cardRouter.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.getAllFlashcards(userId, (error, results) => {
    if (error) {
      console.error("Error fetching flashcards:", error);
      return res.json({ message: "Error fetching flashcards" });
    }
    res.status(200).json(results);
  });
});

cardRouter.put("/:id", checkUserId, (req, res) => {
  const { userId, question, answer, category } = req.body;
  const { id } = req.params;
  if (!question || !answer) {
    return res.json({ message: "Question and answer are required" });
  }
  db.updateFlashcard(
    userId,
    id,
    question,
    answer,
    category,
    (error, results) => {
      if (error) {
        console.error("Error updating flashcard:", error);
        return res.json({ message: "Error updating flashcard" });
      }
      if (results.affectedRows === 0) {
        return res.json({ message: "Flashcard not found or not authorized" });
      }
      res.status(200).json({ message: "Flashcard updated successfully" });
    }
  );
});

cardRouter.delete("/:id", checkUserId, (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  db.deleteFlashcard(userId, id, (error, results) => {
    if (error) {
      console.error("Error deleting flashcard:", error);
      return res.json({ message: "Error deleting flashcard" });
    }
    if (results.affectedRows === 0) {
      return res.json({ message: "Flashcard not found or not authorized" });
    }
    res.status(200).json({ message: "Flashcard deleted successfully" });
  });
});

module.exports = cardRouter;
