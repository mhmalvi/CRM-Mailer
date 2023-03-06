// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
// const attachments = require('attachments')
// const recipient
sendMail = async (req, res) => {
  console.log("controller");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tanjibrubyat@gmail.com",
      pass: "qaaqcvbjgnyrhgrr",
    },
    // attachments: [
    //   {
    //     filename: "image.png",
    //     path: "../../../public/images/b2cde6d6-a2fa-439a-b06f-1bf93360760f.jpg",
    //     cid: "unique@nodemailer.com", //same cid value as in the html img src
    //   },
    // ],
  });
  // res.render('mail',{subject:req.body.subject})
  // console.log(__dirname)
  const type = req.body.type;
  const text = req.body.text;
  const name = req.body.name;
  const student_id = req.body.student_id;
  const lead_id = req.body.lead_id;
  const payment = req.body.payment;
  let info;
  let file = path.join(__dirname, "../../../views/skilled.ejs");

  const data = await ejs.renderFile(file, {
    text,
    type,
    name,
    student_id,
    lead_id,
    payment,
  });

  // console.log(data)
  const recipient = [req.body.to];
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

getMail = async (req, res) => {
  res.render("skilled");
};

module.exports = { sendMail, getMail };
