const Book = require("../Models/book");

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET book by ID
const getSingleBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not Found!",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD new book
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

// UPDATE book
const updateBook = async (req, res) => {
  try {
    const updateBookById = req.params.id;
    const updateFormData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      updateBookById,
      updateFormData,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updatedBook,
    });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not Found!",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went Wrong ! please try again",
    });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not Found!",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedBook,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went Wrong ! please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  deleteBook,
  updateBook,
};
