require("dotenv").config();

const express = require("express");

const connectToDB = require("./Database/db");
const bookRoutes = require("./Routes/book-routes");

const app = express();
const PORT = process.env.PORT || 4000;
// connect to our database

// middleWare ->express.json()

app.use(express.json());

//routes here
app.use("/api/books", bookRoutes);

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
