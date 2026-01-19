require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { configureCors } = require("./config/corsConfig");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const { globalErrorhandler } = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const app = express();
const PORT = process.env.PORT;
app.use(requestLogger);
app.use(addTimeStamp);
app.use("/api/v1", urlVersioning("v1"));

app.use(configureCors());
app.use(createBasicRateLimiter(100, 15 * 60 * 1000));
app.use(express.json());
app.use(globalErrorhandler);
app.listen(PORT, () => {
  console.log(`Server is running this Port ${PORT}`);
});
