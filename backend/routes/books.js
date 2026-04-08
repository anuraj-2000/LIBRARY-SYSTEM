const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM books ORDER BY title ASC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.post("/borrow/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      "SELECT available_copies FROM books WHERE id = $1",
      [id]
    );

    if (result.rows[0].available_copies > 0) {
      await db.query(
        "UPDATE books SET available_copies = available_copies - 1 WHERE id = $1",
        [id]
      );

      res.json({ message: "Book borrowed" });
    } else {
      res.status(400).json({ message: "No copies available" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.post("/return/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      "SELECT available_copies, total_copies FROM books WHERE id = $1",
      [id]
    );

    const book = result.rows[0];

    if (book.available_copies < book.total_copies) {
      await db.query(
        "UPDATE books SET available_copies = available_copies + 1 WHERE id = $1",
        [id]
      );

      res.json({ message: "Book returned" });
    } else {
      res.status(400).json({ message: "All copies already returned" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;