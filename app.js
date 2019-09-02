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

    var newItem = new Item({content: req.body.newItem});
    Item.insertMany([newItem]);
    res.redirect("/");

})

app.post("/delete", (req, res)=>{

    Item.findByIdAndDelete(req.body.checkbox, (err)=>{

        if(err){

            console.log(err)

        }else{

            res.redirect("/");

        }

    })

})

app.listen(3000, () => {

    console.log("Server running on port 3000.")

})