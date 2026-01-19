const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: "1", tittle: "Book 1" },
  { id: "2", tittle: "Book 2" },
];

// Home
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our bookstore API" });
});

// Get all books
app.get("/get", (req, res) => {
  res.json(books);
});

// Get single book
app.get("/get/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Add book

app.post("/add", (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "New book is added successfully",
  });
});

// ✅ Update book (FIXED)
app.put("/update/:id", (req, res) => {
  const findCurrentBook = books.find(
    (bookItem) => bookItem.id === req.params.id
  );

  if (!findCurrentBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  // ✅ SAFE UPDATE
  if (req.body && req.body.tittle) {
    findCurrentBook.tittle = req.body.tittle;
  }

  res.status(200).json({
    message: `Book with Id ${req.params.id} updated successfully`,
    data: findCurrentBook,
  });
});

/// delete book

app.delete("/delete/:id", (req, res) => {
  const findIndexOfCurrentBook = books.findIndex(
    (item) => item.id === req.params.id
  );
  if (findIndexOfCurrentBook !== -1) {
    const deletedBook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      message: "Book deleted Successfully",
      data: deletedBook[0],
    });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
