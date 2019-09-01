const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let itemsList = []

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    res.render(__dirname + "/views/list.ejs", {
        date: date.getDate(),
        itemsList: itemsList
    });

})

app.post("/", (req, res)=>{

    itemsList.push(req.body.newItem);
    res.redirect("/");

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})