const express = require("express");

const {
  createAutor,
  createBook,
  getBookWithAuthor,
} = require("../Controllers/book-controllers");
const router = express.Router();

router.post("/author", createAutor);
router.post("/book", createBook);
router.get("/book/:id", getBookWithAuthor);
module.exports = router;
