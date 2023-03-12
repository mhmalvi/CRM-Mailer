const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const MailController = require("../controllers/Mail-controller");
const {
  sendMail,
  payment_mail,
  registration_mail,
} = require("../controllers/Mail-controller");

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
router.post("/send-mail",sendMail)
router.post("/send-payment-mail", payment_mail);
router.post("/send-registration-mail", registration_mail);
// // define the about route
// router.get("/about", (req, res) => {
//   res.send("About birds");
// });

module.exports = router;
