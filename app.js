const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

// const date = require(__dirname + "/date.js");


const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-dev:test123@cluster0.wnx4q.mongodb.net/todolistDB");

const itemSchema = {
  name: "String"
};

const Item = mongoose.model("item",itemSchema);

const item1 = new Item({name: "Welcome to todo list"});
const item2 = new Item({name: "Type and hit + to add"});
const item3 = new Item({name: "<-- Click here to delete"});

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("list",listSchema);

const defaultItem = [item1,item2,item3];

app.get("/",function(req,res){

  Item.find({},function(err,foundItems){
    if(foundItems.length === 0){
      Item.insertMany(defaultItem,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully added!");
        }
      });
      res.redirect("/");
    }else{
      res.render("list",{listTitle : "Today", newListItems: foundItems});
    }
  });
});

app.get("/:customListName",function(req,res){
  const listName = _.capitalize(req.params.customListName);
  List.findOne({name: listName},function(err,requiredList){
    if(err){
      console.log("Error");
    }else{
      if(!requiredList){
        const list = new List({
          name: listName,
          items: defaultItem
        });
        list.save();
        res.redirect("/" + listName);
      }
      else{
        res.render("list",{listTitle: requiredList.name, newListItems: requiredList.items});
      }
    }
  });
});


app.post("/",function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else{
    List.findOne({name: listName},function(err,foundList){
      if(!err && foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      }
    });
  }
});

app.post("/delete",function(req,res){
  const deleteID = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.deleteOne({_id: deleteID},function(err){
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
    });
  } else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: deleteID}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server Listening ");
});
