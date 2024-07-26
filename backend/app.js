const express = require("express")
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");

// Config Dotenv
require("dotenv").config({path: "./config/.env"})

require("./config/passport.js");

const errorHandler = require("./middlewares/errorHandlerMW");

app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes:
app.use("/api/v1/", require("./routes/userRoute"))

// Middlewares:
app.use(errorHandler);

module.exports = app;