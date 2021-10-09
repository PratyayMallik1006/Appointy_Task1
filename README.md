# Appointy Task 1
## Instagram Backend API



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This project is for the internship recruitment task at appointy for tech department, before going through the project, I would like to say that I am aware that my project is not perfect as per the given task, but I tried to the best of my capabilities to make the required project in the given time.

## Task

- Design and Develop an HTTP JSON API for Instagram
- Duration - 8th Oct 6 pm to 9th Oct 11:59pm
- Task Document: https://docs.google.com/document/d/1sFhVumoczf_PmaL_R__Rm9AHqaHsUWgj1x9YcQP6Is4/edit#

# About Project

Here we will try to make our own RESTful API by using HTTP equest verbs and by using specific pattern of Routr/Endpoint URLs.
> ##### What are HTTP verbs?
# 
> They are:
> GET
> POST
> PUT & PTCH
> DELETE
> These are very similar to CRUD, i.e, Create(POST), Read(GET), Update(PUT & PATCH), Delete

## Creating a Database with Robo 3T
## Setting up the server
## GET all users
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
## POST a new user
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
## Delete all users
.delete(function(req, res){

  User.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all users.");
    } else {
      res.send(err);
    }
  });
});
## Organisinng Code - Chainned Route
You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.
## GET  a specific user
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
## PUT a specific user
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

## PATCH a specific user
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
## DELETE a specific user
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
