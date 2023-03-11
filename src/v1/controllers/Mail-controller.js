// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
// const { exit } = require("process");
// const attachments = require('attachments')
// const recipient
sendMail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tanjibrubyat@gmail.com",
      pass: "qaaqcvbjgnyrhgrr",
    },
  });

  let type;
  const status = req.body.lead_status;
  const response = req.body.response;
  console.log(response);
  if (status == 0) {
    type = "suspended";
  } else if (status == 1) {
    type = "new lead";
  } else if (status == 2) {
    type = "skilled";
  } else if (status == 3 && response !== "") {
    type = "called";
  } else if (status == 4) {
    type = "paid";
  } else if (status == 5) {
    type = "verified";
  } else if (status == 6) {
    type = "completed";
  } else if (status == 7) {
    type = "canceled";
  }
  console.log(type);
  // const text = req.body.text;
  const name = req.body.name;
  const student_id = req.body.student_id;
  const lead_id = req.body.lead_id;
  // const payment = req.body.payment;
  let info;
  let file = path.join(__dirname, "../../../views/skilled.ejs");

  const data = await ejs.renderFile(file, {
    // text,
    type,
    name,
    student_id,
    lead_id,
    response
    // payment,
  });

  // console.log(data)
  const recipient = ["megatanjib@gmail.com"];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "tanjibrubyat@gmail.com",
      to: recipient[i],
      subject: req.body.subject,
      html: data,
    });
  }

  if (info) {
    res.status(200).send("success");
  } else {
    res.status(400).send("failed");
  }
};

payment_mail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tanjibrubyat@gmail.com",
      pass: "qaaqcvbjgnyrhgrr",
    },
  });

  let file = path.join(__dirname, "../../../views/payment_complete.ejs");


  const data = await ejs.renderFile(file, {
    // text,
    // type,
    // name,
    // student_id,
    // lead_id,
    // response,
    // payment,
  });
  const recipient = ["megatanjib@gmail.com"];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "tanjibrubyat@gmail.com",
      to: recipient[i],
      subject: req.body.subject,
      html: data,
    });
  }

  if (info) {
    res.status(200).send("success");
  } else {
    res.status(400).send("failed");
  }
}

module.exports = { sendMail, payment_mail };

