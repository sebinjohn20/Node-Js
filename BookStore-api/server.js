require("dotenv").config();
const express = require("express");

const connectToDB = require("./Database/db");
const bookRoutes = require("./Routes/book-routes");

const app = express();
// const PORT = process.env.PORT;
const PORT = 4000;

// middleware
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

// start server
connectToDB()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

//
