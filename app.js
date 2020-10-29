require("dotenv").config();
const express = require("express");
const favicon = require("express-favicon");
const helmet = require("helmet");
const path = require("path");

const cors = require("cors");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const siteRoutes = require("./routes/index");
const limiter = require("./configs/limiter");
const { errorLogger, requestLogger } = require("./middlewares/logger");
const { databaseUrl, databaseConfig } = require("./configs/database");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const { PORT = 8080 } = process.env;
mongoose.connect(databaseUrl, databaseConfig).catch((err) => console.log(err.reason));
const app = express();

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(
  cors({
    origin: [
      "https://news-explorer24.ru",
      "https://www.news-explorer24.ru",
      "http://news-explorer24.ru",
      "http://www.news-explorer24.ru",
      "https://snaaaaaaake.github.io",
      "http://snaaaaaaake.github.io",
      "http://localhost:3000",
      "http://localhost:8080",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
  })
);
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);
app.use(siteRoutes);
app.use(errorLogger);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
