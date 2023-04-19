const Users = require("../models/users.model.js");
const UserFetch = require('../helper/UserFetch.js')

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Fields must be filled in."
    });
  }
  console.log(req.body)

  // Create a user
  const users = new Users({
    UserName: req.body.UserName,
    PassWord: req.body.PassWord,
    UserAdmin: req.body.UserAdmin,
    FName: req.body.FName,
    LName: req.body.LName
  });

  // Save user in the database
  Users.create(users, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not create new users at this time."
      });
    else res.send(data);
  });
};

//checks if the data in the db matches whats in the , fetches from 3rd party API
exports.init = (req, res) => {
  UserFetch.dbSetUp((err, data) => {
  if (err)
      res.status(500).send({
        message:
          err.message || "Could not add all users at this time."
      });
    else res.send({message: 'users added successfully'});
  })}



// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const UName = req.query.UserName;
  const limit = req.query.limit;
  const offset = req.query.offset;

  Users.getAll(UName, limit, offset, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not retrieve all user(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve all users from the database by search
exports.findByStartingLetter = (req, res) => {
  const letter = req.params.letter;
  Users.getByStartingLetter(letter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find user(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve a user from the database.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.getOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find user by ID at this time."
      });
    else res.send(data);
  });
};

// Update a user from the database.
exports.update = (req, res) => {
  const id = req.params.id;
  const newUserName=req.body.UserName;
  const newPassWord = req.body.PassWord
  const newUserAdmin = req.body.UserAdmin
  const newFName = req.body.FName
  const newLName = req.body.LName
  Users.updateOne(id, newUserName, newPassWord, newUserAdmin, newFName, newLName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not update this user."
      });
    else res.send(data);
  });
};

// Delete a user from the database.
exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Users.deleteOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete this user."
      });
    else res.send(data);
  });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Users.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete all users."
      });
    else res.send(data);
  });
};

//locks the table from being written
exports.lockAll = (req, res) => {
  Users.lockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not lock all users."
      });
    else res.send(data);
  });
};

//unlocks all tables
exports.unlockAll = (req, res) => {
  Users.unlockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not unlock all users."
      });
    else res.send(data);
  });
};