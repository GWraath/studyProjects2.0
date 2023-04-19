const sql = require("./db.js");

// constructor
const Users = function(users) {
  this.UserName = users.UserName;
  this.PassWord = users.PassWord;
  this.UserAdmin = users.UserAdmin;
  this.FName = users.FName;
  this.LName = users.LName;
};

//Create a new user
Users.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

//Get all users
Users.getAll = (UserName,limit, offset, result) => {
  let query = "SELECT * FROM users";

  if (UserName) {
    query += ` WHERE makeid LIKE '%${UserName}%'`;
  }
  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  if (offset) {
    query += ` OFFSET ${offset}`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Get a user by id
Users.getOne = (id, result) => {
  let query = "SELECT * FROM users";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Get user by username
Users.getByStartingLetter = (letter, result) => {
  let query = "SELECT UserName FROM users";

  if (letter) {
    query += ` WHERE UserName LIKE '%${letter}%'`;
  }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Update a user by id
Users.updateOne = (id, newUserName, newPassWord, newUserAdmin, newFName, newLName, result) => {
  let query = "update users set";

  let comma = false
  if (newUserName) {
    query += ` UserName='${newUserName}'`;
    comma=true 
  }
  if (newPassWord) {
    query += (comma?', ' : ' ')+`PassWord='${newPassWord}'`;
    comma=true 
  }
  // if (newUserAdmin!==undefined){
  //   query += (comma?', ' : ' ')+`UserAdmin=${newUserAdmin}`;
  //   comma=true 
  // }
  if (newFName) {
    query += (comma?', ' : ' ')+`FName='${newFName}'`;
    comma=true 
  }
  if (newLName){
    query += (comma?', ' : ' ')+`LName='${newLName}'`;
  }
  query +=  ` WHERE id=${id}`
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Delete a user by id
Users.deleteOne = (id,result) => {
  let query = "DELETE FROM users";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Delete all users
Users.deleteAll = (result) => {
  let query = "DELETE FROM users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Lock all users
Users.lockAll = (result) => {
  let query = "LOCK TABLES users read";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Unlock all users
Users.unlockAll = (result) => {
  let query = "UNLOCK TABLES";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = Users;