const express = require("express");
const app = express();

// Middleware

app.use(express.json());
let books = [
  {
    id: "1",
    tittle: "Book 1",
  },
  {
    id: "2",
    tittle: "Book 2",
  },
];

///  get all Books

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to out bookstore api",
  });
});

app.get("/get", (req, res) => {
  res.json(books);
});

// get a single book

app.get("/get/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found! Please try with a differnt Book ID",
    });
  }
});

// add a new book

app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    tittle: `Book${books.length + 1}`,
  };
  books.push(newBook);
  res
    .status(200)
    .json({ data: newBook, message: "New book is add successfully" });
});
const port = 4000;
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
