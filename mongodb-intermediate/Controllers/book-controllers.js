const Author = require("../Model/Author");
const Book = require("../Model/Books");
const createAutor = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
const createBook = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
