// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { json } = require("body-parser");
const { exit, getMaxListeners } = require("process");
// const { exit } = require("process");
// const attachments = require('attachments')
// const recipient
sendMailForResponse = async (req, res) => {
  let transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "admin@itecounsel.com",
      pass: "hgjudgnicmuyduzi",
    },
  });

  let type;
  const status = req.body.lead_status;
  const response = req.body.response;
  const logo = req.body.logo;
  const college = req.body.client;
  const course = req.body.course;
  const logo_file = "https://crmcompany.quadque.digital/public/" + logo;
  // console.log(req.body);
  // if (status == 0) {
  //   type = "suspended";
  //   subject = ""
  // }
  let email;
  subject = college + "-" + course;
  if (status == 3 && response == 1) {
    type = "called";
  } else if (status == 3 && response == 0) {
    type = "called";
  }
  // console.log(email);
  // const text = req.body.text;
  const name = req.body.name;
  const student_id = req.body.student_id;
  const lead_id = req.body.lead_id;
  email = "megatanjib@gmail.com";
  // const payment = req.body.payment;
  let info;
  let file = path.join(__dirname, "../../../views/response.ejs");

  const data = await ejs.renderFile(file, {
    // text,
    type,
    name,
    student_id,
    lead_id,
    response,
    logo_file,
    // payment,
  });

  // console.log(data)
  const recipient = [email, "sourav@quadque.digital", "ibristy009@gmail.com"];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "admin@itecounsel.com",
      to: recipient[i],
      subject: subject,
      html: data,
    });
  }

  if (info) {
    res.status(200).send("success");
  } else {
    res.status(400).send("failed");
  }
};

sendMail = async (req, res) => {
  console.log(req.body.logo);
  let transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "admin@itecounsel.com",
      pass: "hgjudgnicmuyduzi",
    },
  });

  let type;
  const status = req.body.lead_status;
  const response = req.body.response;
  const logo = req.body.logo;
  const college = req.body.client;
  const course = req.body.course;
  const logo_file = "https://crmcompany.quadque.digital/public/" + logo;
  // if (status == 0) {
  //   type = "suspended";
  //   subject = ""
  // }
  let email;
  subject = college + "-" + course;
  if (status == 1) {
    type = "new lead";

    email = "megatanjib@gmail.com";
  } else if (status == 2) {
    type = "skilled";
    // subject = "You are skilled";
    email = "megatanjib@gmail.com";
  }
  // else if (status == 3 && response !== "") {
  //   type = "called";
  //   subject = "you are called";
  // }
  else if (status == 4) {
    type = "paid";
    // subject = "payment complete";
    email = "megatanjib@gmail.com";
  } else if (status == 5) {
    type = "verified";
    // subject = "you are verified";
    email = "megatanjib@gmail.com";
  } else if (status == 6) {
    type = "completed";
    // subject = "complete";
    email = "megatanjib@gmail.com";
  } else if (status == 7) {
    type = "canceled";
    // subject = "canceled";
    // email = "megatanjib@gmail.com";
  }
  // console.log(email);
  // const text = req.body.text;
  const name = req.body.name;
  const student_id = req.body.student_id;
  const lead_id = req.body.lead_id;
  // email = "megatanjib@gmail.com";
  // const payment = req.body.payment;
  let info;
  let file = path.join(__dirname, "../../../views/skilled.ejs");

  const data = await ejs.renderFile(file, {
    // text,
    type,
    name,
    student_id,
    lead_id,
    response,
    logo_file,
    course,
    college,
    // payment,
  });

  // console.log(data)
  const recipient = [email, "sourav@quadque.digital", "ibristy009@gmail.com"];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "admin@itecounsel.com",
      to: recipient[i],
      subject: subject,
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
  // console.log("data:",req)
  // console.log(req.body.data.invoice_id);
  // console.log(req.body.data.company_logo);

  const company_details = JSON.parse(req.body.data);
  // console.log("=++=", JSON.parse(req.body.data));

  const invoice_id = company_details?.invoice_id;
  const transaction_id = company_details?.transaction_id;
  const lead_id = company_details?.lead_id;
  const company_id = company_details?.company_id;
  const user_id = company_details?.user_id;
  const company_name = company_details?.company_name;
  const company_logo =
    "https://crmcompany.quadque.digital/public/" +
    company_details?.company_logo;
  const payment_amount = company_details?.payment_amount;
  const payment_method = company_details?.payment_method;
  const payer_name = company_details?.payer_name;
  const payer_email = company_details?.payer_email;
  const company_email = company_details?.company_email;
  const company_contact = company_details?.company_contact;
  const company_website = company_details?.company_website;
  console.log(payer_email);
  // exit()
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "admin@itecounsel.com",
      pass: "hgjudgnicmuyduzi",
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
    invoice_id,
    transaction_id,
    lead_id,
    company_id,
    user_id,
    company_name,
    company_logo,
    payment_amount,
    payment_method,
    payer_name,
    payer_email,
    company_email,
    company_contact,
    company_website,
  });
  const recipient = [
    "megatanjib@gmail.com",
    payer_email,
    "megatanjib@gmail.com",
  ];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "admin@itecounsel.com",
      to: recipient[i],
      subject: "payment complete",
      html: data,
    });
  }

  if (info) {
    res.status(200).send("success");
  } else {
    res.status(400).send("failed");
  }
};

registration_mail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "admin@itecounsel.com",
      pass: "hgjudgnicmuyduzi",
    },
  });
  //dfdgfgdfgg
  const email = "megatanjib@gmail.com";
  const name = req.body.full_name;
  const password = req.body.password;

  let file = path.join(__dirname, "../../../views/registration_mail.ejs");

  const data = await ejs.renderFile(file, {
    // text,
    // type,
    // name,
    // student_id,
    // lead_id,
    // response,
    // payment,
    email,
    user_name,
    password,
  });
  const recipient = [email, "sourav@quadque.digital", "ibristy009@gmail.com"];
  for (let i = 0; i < recipient.length; i++) {
    // console.log(recipient[i])
    info = await transporter.sendMail({
      from: "admin@itecounsel.com",
      to: recipient[i],
      subject: "registration status",
      html: data,
    });
  }

  if (info) {
    res.status(200).send("success");
  } else {
    res.status(400).send("failed");
  }
};

module.exports = {
  sendMail,
  payment_mail,
  registration_mail,
  sendMailForResponse,
};
