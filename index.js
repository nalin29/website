// index.js

/**
 * Required External Modules
 */

 
const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv');

/**
 * App Variables
 */

 dotenv.config();

 const app = express();

 const port = process.env.PORT || "8000";

 const sendgridOptions = {
   service: "SendGrid",
   auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD
   }
 };

/**
 *  App Configuration
 */

 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

 app.get("/", (req, res) => {
   res.render("index", {title: "Home"});
 });

 app.get("/project1", (req, res) => {
    res.render("project1", {title: "Project1"});
 });

 app.get("/project2", (req, res) => {
  res.render("project2", {title: "Project1"});
});

 app.post("/contactform", (req, res) => {
   console.log('Data:', req.body);

   if(req.body.name == '' || req.body.email =='' || req.body.message ==''){
     console.log('empty form');
     res.render("messageFailure", {title: "Home"});
   }
   else{
   
    const smtpTrans = nodemailer.createTransport(sendgridOptions);

    const mailOpts = {
        from: process.env.SENDGRID_EMAIL,
        to: process.env.REC_EMAIL,
        subject: 'New message from contact form at my website',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };

    smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
        console.log(error); // Show a page indicating failure
        res.render("messageFailure", {title: "Home"});
    }
    else {
        console.log(response);
        res.render("messageReceived", {title: "received"});
    }
    });
  }

 });


/**
 * Server Activation
 */

 app.listen(port, () => {

   console.log(`Listening to requests on http://localhost:${port}`);

 });