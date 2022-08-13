require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Read JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// API routes
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// API endpoint
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello user!",
    date: new Date(),
  });
});

// Connect to mongodb
const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;

mongoose
  .connect(
    "mongodb+srv://shirator:carlosC78!@cluster0.rjuxjnj.mongodb.net/apidb?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
