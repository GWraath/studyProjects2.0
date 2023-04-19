module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // // Initialise the database
    router.get("/init", users.init);
  
    // // Retrieve all users
    router.get("/", users.findAll);
  
    // // Retrieve searched users
    router.get("/search/:letter", users.findByStartingLetter);
  
    // // Retrieve a user by id
    router.get("/:id", users.findOne);
  
    // // Update a user by id
    router.put("/:id", users.update);
  
    // // Delete a user by id
    router.delete("/:id", users.deleteOne);
  
    // // Delete all users
    router.delete("/", users.deleteAll);
  
    // // lock all users
    router.lock("/", users.lockAll);
  
    // // unlock all users
    router.unlock("/", users.unlockAll);
  
    app.use('/api/users', router);
  };
  
  