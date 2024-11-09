const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Student = require("./models/students.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require('dotenv').config({path: __dirname + '/.env'})

async function main() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college';

    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}
main();

// let std = new Student({
//     name: "Rajkumar Avachar",
//     age: 21,
//     city: "Malkapur"
// });

// std.save().then((result) => {
//     console.log(result);
// });


app.get("/", async (req, res) => {
    let students = await Student.find();
    console.log(students);
    res.render("index.ejs", {students});
});

app.get("/students", async (req, res) => {
    let students = await Student.find();
    res.render("students.ejs", { students });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});