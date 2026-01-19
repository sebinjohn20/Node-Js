const cors = require("cors");
const configureCors = () => {
  return cors({
    //origin -> this will tel that which origins you want  can access you api
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:4000", // local deb
        "https://yourcustomdomain.com", //production domain
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("NOr allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, // enable to  support cookies
    preflightContinue: false,
    maxAge: 600, // cache pre flight responses for 10 mins (600seconds )--> avoid sending options requests mult
    optionsSuccessStatus: 204,
  });
};
module.exports = { configureCors };
