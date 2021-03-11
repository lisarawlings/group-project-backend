const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routes/routes");
require("dotenv").config();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0.ouazy.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.once("open", function () {
  //console.log("MongoDB database connection established successfully!");
});

app.use("/", apiRouter);

app.listen(5000, () => {
  //console.log("Online");
});
