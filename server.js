/*************************************************************************************
 * WEB322 - 2231 Project (ASSIGNMENT 3)
 * I declare that this assignment is my own work in accordance with the Seneca Academic
 * Policy. No part of this assignment has been copied manually or electronically from
 * any other source (including web sites) or distributed to other students.
 *
 * Student Name  : Gagandeep kaur
 * Student ID    : 171700214
 * Course/Section: WEB322 ZBB
 *
 **************************************************************************************/

const express = require("express");
const exphbs = require("express-handlebars");
const rentals = require("./models/rentals-db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultlayout: "main",
  })
);
app.set("view engine", ".hbs");

app.use(express.static("assets"));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.render("home", {
    rentals: rentals.getFeaturedRentals(),
  });
});

app.get("/rentals", (req, res) => {
  res.render("rentals", {
    locations: rentals.getRentalsByCityAndProvince(),
  });
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.post("/sign-up", (req, res) => {
  let values = req.body;
  let errors = {
    fName: true,
    lName: false,
    pwd: false,
    email: false,
  };
  const checkText = (value) => {
    return typeof value !== "string" || value.trim().length == 0;
  };
  const checkEmail = (value) => {
    const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$");
    return !regex.test(value);
  };
  const checkPwd = (value) => {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|&]).{8,12}$/;
    console.log(regex.test(value));
    return !regex.test(value);
  };
  errors.fName = checkText(values.fName);
  errors.lName = checkText(values.lName);
  errors.email = checkEmail(values.email);
  errors.pwd = checkPwd(values.pwd);

  if (!errors.fName && !errors.lName && !errors.email && !errors.pwd) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: values.email, 
      from: "gkaur515deep@gmail.com", 
      subject: "Successfully Signed up on Homely",
      html: `<div>
      <p>Dear ${values.fName} ${values.lName},</p>
      <p>We would like to extend a warm welcome to you from the team here at Homely! Thank you for choosing to sign up with
        us and entrusting us with your home search.
      </p>
      <p> As you may already know, Homely is a leading real estate platform that connects buyers, renters, and sellers with
        their dream homes. Our mission is to make the home buying and selling process as easy and stress-free as possible.
        With Homely, you can browse thousands of listings, connect with local agents, and get expert advice on everything
        from mortgages to home renovations.
      </p>
      <p>As a new member of our community, you will have access to all of our latest features and tools, including
        personalized property recommendations, real-time market data, and much more. We're confident that you'll find
        everything you need to make your home search a success.
      </p>
      <p>If you have any questions or feedback, please don't hesitate to reach out to our support team. We're always here to
        help.
      </p>
      <p> Once again, welcome to Homely! We look forward to helping you find your perfect home.
      </p>
      <p> Best regards, </p>
      <p>Gagandeep Kaur
      </p>
      <p>
       Homely
      </p>
    </div>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        res.redirect("/welcome")
      })
      .catch((error) => {
        console.error(error);
        res.render("sign-up", { values, errors });
      });
  } else {
    res.render("sign-up", { values, errors });
  }
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.post("/log-in", (req, res) => {
  let values = req.body;
  let errors = {
    pwd: false,
    email: false,
  };
  const checkText = (value) => {
    return typeof value !== "string" || value.trim().length == 0;
  };

  errors.email = checkText(values.email);
  errors.pwd = checkText(values.pwd);

  if (!errors.email && !errors.pwd) {
    values = {};
  }

  res.render("log-in", { values, errors });
});

app.get("/welcome", (req, res) => {
  res.render("welcome")
})
// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);
