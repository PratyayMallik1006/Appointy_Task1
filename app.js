//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/PratyayDB", {useNewUrlParser: true});

const userSchema = {
  
    id: String,
    name: String,
    email: String,
    password: String
};

const User = mongoose.model("User", userSchema);

///////////////////////////////////Requests Targetting all Users////////////////////////

app.route("/users")

.get(function(req, res){
  User.find(function(err, foundUsers){
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newUser = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save(function(err){
    if (!err){
      res.send("Successfully added a new user.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  User.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all users.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific User////////////////////////

app.route("/users/:userid")

.get(function(req, res){

  User.findOne({id: req.params.userid}, function(err, foundUser){
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("No users matching that title was found.");
    }
  });
})

.put(function(req, res){

  User.update(
    {id: req.params.userid},
    {name: req.body.name, id: req.body.id},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected user.");
      }
    }
  );
})

.patch(function(req, res){

  User.update(
    {id: req.params.userid},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated user.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  User.deleteOne(
    {id: req.params.userid},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding user.");
      } else {
        res.send(err);
      }
    }
  );
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
