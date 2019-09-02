const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

let itemsList = []

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true});


app.get("/", (req, res) => {

    res.render(__dirname + "/views/list.ejs", {
        listTitle: "Today",
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