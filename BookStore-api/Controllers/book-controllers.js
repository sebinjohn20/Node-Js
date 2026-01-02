const Book = require("../Models/book");

const getAllBooks = async (req, res) => {};
const getSingleBookById = async (req, res) => {};
const addNewBook = async (req, res) => {
  try {
    const newlyCreatedBook = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newlyCreatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const updateBook = async (req, res) => {};
const deleteBook = async (req, res) => {};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  deleteBook,
  updateBook,
};

//ghghghghgfhghghghghghhhgghghghhfghghghghghhgghghghgh
