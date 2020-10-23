require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const siteRoutes = require("./routes/index");
const { databaseUrl, databaseConfig } = require("./configs/database");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
mongoose
  .connect(databaseUrl, databaseConfig)
  .catch((err) => console.log(err.reason));
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(siteRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
