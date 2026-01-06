require("dotenv").config();
const express = require("express");
const connectToDB = require("./Database/db");
const authRoutes = require("./Routes/auth-routes");
const homeRoutes = require("./Routes/home-routes");
const adminRoutes = require("./Routes/admin-routes");
const uploadImageRoutes = require("./Routes/imageRoutes");
connectToDB();
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listening to PORT ${PORT}`);
});


