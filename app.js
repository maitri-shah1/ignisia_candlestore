const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const app = express();

// Middleware and Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static('public'));

// Home Route
app.get("/", (req, res) => {
    res.render("home/index.ejs"); 
});

app.get('/about', (req, res) => {
    res.render("\about/index.ejs");
});


app.get("/shop" , (req,res) => {
    res.render("\shop/index.ejs");
});

app.get("/cart" , (req,res) => {
    res.render("\cart/index.ejs");
});

app.get("/liked" , (req,res) => {
    res.render("\liked/index.ejs");
});

app.get("/contact" , (req,res) => {
    res.render("\contact/index.ejs");
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("/thank-you", (req, res) => {
    res.render("thank-you");
});


// Server Start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
