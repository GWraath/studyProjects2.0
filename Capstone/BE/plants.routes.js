module.exports = app => {
    const plants = require("../controllers/plants.controller.js");
  
    var router = require("express").Router();
  
    // Create a new plant
    router.post("/", plants.create);
  
    // // Initialise the database
    router.get("/init", plants.init);
  
    // // Retrieve all plants
    router.get("/", plants.findAll);
  
    // // Retrieve searched plants by common name
    router.get("/search/:letter", plants.findByStartingLetter);

    // // Retrieve searched plants by vitamins
    router.get("/search/vit/:letters", plants.findByStartingVitamin);

    // // Retrieve searched plants
    router.get("/vit", plants.findAllVitamins);

    // // Retrieve searched plants by minerals
    router.get("/search/min/:letters", plants.findByStartingMinerals);

    // // Retrieve searched plants
    router.get("/min", plants.findAllMinerals);

    // // Retrieve searched plants by pharma properties
    router.get("/search/pharma/:letters", plants.findByStartingPharma);

    // // Retrieve searched plants
    router.get("/pharma", plants.findAllPharma);
  
    // // Retrieve a plant by id
    router.get("/:id", plants.findOne);
  
    // // Update a plant by id
    router.put("/:id", plants.update);
  
    // // Delete a plant by id
    router.delete("/:id", plants.deleteOne);
  
    // // Delete all plants
    router.delete("/", plants.deleteAll);
  
    // // lock all plants
    router.lock("/", plants.lockAll);
  
    // // unlock all plants
    router.unlock("/", plants.unlockAll);
  
    app.use('/api/plants', router);
  };
  
  