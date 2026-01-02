const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  deleteBook,
  updateBook,
} = require("../Controllers/book-controllers");
//create express router

//all routes that are related to books only

router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);

router.delete("/delete/:id", deleteBook);

module.exports = router;
