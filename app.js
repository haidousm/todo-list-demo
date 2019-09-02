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


mongoose.connect("mongodb://localhost:27017/todoListDB", {
    useNewUrlParser: true
});

const Item = mongoose.model("Item", {
    content: String
});

const defItem1 = new Item({
    content: "Welcome To Your To-Do List!"
});

const defItem2 = new Item({
    name: "Hit the + button to add a new item."
});

const defItem3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [defItem1, defItem2, defItem3];

app.get("/", (req, res) => {

    Item.find({}, (err, foundItems) => {

        if (err) {

            console.log(err);

        } else {

            if (foundItems.length == 0) {

                Item.insertMany(defaultItems)
                res.render("list.ejs", {
                    listTitle: "Today",
                    itemsList: defaultItems
                })

            } else {

                res.render("list.ejs", {
                    listTitle: "Today",
                    itemsList: foundItems
                })

            }

        }

    })

})

app.post("/", (req, res) => {

    itemsList.push(req.body.newItem);
    res.redirect("/");

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})