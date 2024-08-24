const express = require("express");
const blogsRoute = require("./routes/blogRoute"); // Make sure the path is correct
const cors = require("cors");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

const User = "admin1";
const Password = "admin1";
const Database = "MyBlogDatabase";

const mongoURI = `mongodb+srv://${User}:${Password}@cluster0.eab39.mongodb.net/${Database}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
  res.send("Default Route");
});

app.use("/blogs", blogsRoute); // Use the router as middleware

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3099, () => {
  console.log("Server is running on port 3099");
});
