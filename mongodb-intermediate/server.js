require("dotenv").config();
const express = require("express");

const connectToDB = require("./Database/db");
const productRoutes = require("./Routes/products-routes");

const app = express();

// middleware
app.use(express.json());

// DB connection
connectToDB();

// routes
app.use("/products", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
