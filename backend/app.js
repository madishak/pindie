const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pagesRouter = require("./routes/pages.js");
const apiRouter = require("./routes/api.js");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(PORT);
