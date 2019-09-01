const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    res.send("It's setup!")

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})