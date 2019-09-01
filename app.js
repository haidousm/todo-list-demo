const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let itemsList = []

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    let date = new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: 'numeric'
    })

    res.render(__dirname + "/views/list.ejs", {
        date: date,
        itemsList: itemsList
    });

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})