require("dotenv").config();
const express = require("express");
const favicon = require("express-favicon");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/index");
const reactMiddleware = require("./middlewares/reactMiddleware");
const limiter = require("./configs/limiter");
const { errorLoggerMiddleware, requestLoggerMiddleware } = require("./middlewares/loggerMiddleware");
const { databaseUrl, databaseConfig } = require("./configs/database");
const { errorHandlerMiddleware } = require("./middlewares/errorHandlerMiddleware");

const { PORT = 8080 } = process.env;
mongoose
  .connect(databaseUrl, databaseConfig)
  .then(() => console.log("Подключено к БД"))
  .catch((err) => {
    console.log("Ошибка подключения к БД: " + err.reason);
  });
const app = express();

app.use(helmet());
app.use(limiter);
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLoggerMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use(apiRoutes);
app.get("*", reactMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
