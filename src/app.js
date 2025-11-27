// jalankan db
require("./config/db");

// panggil libr
const path = require("path");
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

//create server
const app = express();

// render engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use(cookieParser());
app.use(cors());
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

module.exports = app;
