const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const router = require("./src/v1/router/router");
const ejs = require("ejs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
// app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
// app.use(express.static('public'))
app.use("/api", router);

app.listen(2000, () => {
  console.log("running");
});
