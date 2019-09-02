const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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

const List = mongoose.model("List", {
    listTitle: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const defItem1 = new Item({
    content: "Welcome To Your To-Do List!"
});

const defItem2 = new Item({
    content: "Hit the + button to add a new item."
});

const defItem3 = new Item({
    content: "<-- Hit this to delete an item."
});

const defaultItems = [defItem1, defItem2, defItem3];

app.get("/", (req, res) => {

    res.redirect("/today");

})

app.get("/:listTitle", (req, res) => {

    const currentListTitle = req.params.listTitle;

    List.findOne({
        listTitle: currentListTitle
    }).populate("items").exec(function (err, list) {

        if (err) {

            console.log(err)

        } else {

            if (list) {


                res.render("list.ejs", {
                    listTitle: list.listTitle,
                    itemsList: list.items
                })

            } else {

                Item.insertMany(defaultItems)

                const newList = new List({
                    listTitle: currentListTitle,
                    items: defaultItems
                });

                List.insertMany([newList]);

                res.render("list.ejs", {
                    listTitle: currentListTitle,
                    itemsList: defaultItems
                })

            }

        }

    })

})

app.post("/", (req, res) => {

    var newItem = new Item({
        content: req.body.newItem
    });
    Item.insertMany([newItem]);
    res.redirect("/");

})

app.post("/delete", (req, res) => {

    Item.findByIdAndDelete(req.body.checkbox, (err) => {

        if (err) {

            console.log(err)

        } else {

            res.redirect("/");

        }

    })

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})