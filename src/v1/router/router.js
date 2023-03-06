const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const MailController = require("../controllers/Mail-controller");
const { sendMail, getMail } = require("../controllers/Mail-controller");

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
router.route("/send-mail").post(sendMail)
router.route("/mail").get(getMail);
// // define the about route
// router.get("/about", (req, res) => {
//   res.send("About birds");
// });

module.exports = router;
