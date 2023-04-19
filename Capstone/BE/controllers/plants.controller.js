const Plants = require("../models/plants.model.js");
const PlantFetch = require('../helper/PlantFetch.js')

// Create and Save a new plants
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Fields must be filled in."
    });
  }
  console.log(req.body)

  // Create a plant
  const plants = new Plants({
    PlantIMGURL: req.body.PlantIMGURL,
    PlantCName: req.body.PlantCName,
    PlantLName: req.body.PlantLName,
    PlantVitamins: req.body.PlantVitamins,
    PlantMinerals: req.body.PlantMinerals,
    PlantPharmaProps: req.body.PlantPharmaProps,
    PlantDesc: req.body.PlantDesc,
  });

  // Save plant in the database
  Plants.create(plants, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not create a new plant at this time."
      });
    else res.send(data);
  });
};

//checks if the data in the db matches whats in the , fetches from 3rd party API
exports.init = (req, res) => {
  PlantFetch.dbSetUp((err, data) => {
  if (err)
      res.status(500).send({
        message:
          err.message || "Could not add all plants at this time."
      });
    else res.send({message: 'Plants added successfully'});
  })}



// Retrieve all plants from the database.
exports.findAll = (req, res) => {
  const cName = req.query.PlantCName;
  const limit = req.query.limit;
  const offset = req.query.offset;

  Plants.getAll(cName, limit, offset, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not retrieve all plants at this time."
      });
    else res.send(data);
  });
};

// Retrieve all plants from the database.
exports.findByStartingLetter = (req, res) => {
  const letter = req.params.letter;
  Plants.getByStartingLetter(letter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve plants by vitamins.
exports.findByStartingVitamin = (req, res) => {
  const letters = req.params.letters;
  Plants.getByVitamins(letters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve all plants from the database by vitamin.
exports.findAllVitamins = (req, res) => {
  Plants.getAllVitamins((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else 
    {const vitaminProps = new Set()
      for (let d of data){
        const props = d.PlantVitamins
        props.split(',').forEach(element => {
          vitaminProps.add(element.trim())
        });
      }
      res.send(Array.from(vitaminProps));}
  });
};

// Retrieve plants by minerals.
exports.findByStartingMinerals = (req, res) => {
  const letters = req.params.letters;
  Plants.getByMinerals(letters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve all plants from the database by vitamin.
exports.findAllMinerals = (req, res) => {
  Plants.getAllMinerals((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else
    {const mineralProps = new Set()
      for (let d of data){
        const props = d.PlantMinerals
        props.split(',').forEach(element => {
          mineralProps.add(element.trim())
        });
      }
      res.send(Array.from(mineralProps));}
  });
};

// Retrieve plants by pharma.
exports.findByStartingPharma = (req, res) => {
  const letters = req.params.letters;
  Plants.getByPharma(letters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else res.send(data);
  });
};

// Retrieve all plants from the database by pharma.
exports.findAllPharma = (req, res) => {
  Plants.getAllPharma((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant(s) at this time."
      });
    else 
    {const pharmaProps = new Set()
      for (let d of data){
        const props = d.PlantPharmaProps
        props.split(',').forEach(element => {
          pharmaProps.add(element.trim())
        });
      }
      res.send(Array.from(pharmaProps));}
  });
};

// Retrieve all plants from the database.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Plants.getOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find plant by ID at this time."
      });
    else res.send(data);
  });
};

// Update a plant from the database.
exports.update = (req, res) => {
  const id = req.params.id;
  const newPlantIMGURL=req.body.PlantIMGURL;
  const newPlantCName=req.body.PlantCName;
  const newPlantLName = req.body.PlantLName
  const newPlantVitamins = req.body.PlantVitamins
  const newPlantMinerals = req.body.PlantMinerals
  const newPlantPharmaProps = req.body.PlantPharmaProps
  const NewPlantDesc = req.body.PlantDesc
  Plants.updateOne(id, newPlantCName, newPlantLName, newPlantVitamins, newPlantMinerals, newPlantPharmaProps, newPlantIMGURL, NewPlantDesc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not update this plant."
      });
    else res.send(data);
  });
};

// Delete a plant from the database.
exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Plants.deleteOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete this plant."
      });
    else res.send(data);
  });
};

// Delete all plants from the database.
exports.deleteAll = (req, res) => {
  Plants.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete all plants."
      });
    else res.send(data);
  });
};

//locks the table from being written
exports.lockAll = (req, res) => {
  Plants.lockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not lock all plants."
      });
    else res.send(data);
  });
};

//unlocks all tables
exports.unlockAll = (req, res) => {
  Plants.unlockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not unlock all plants."
      });
    else res.send(data);
  });
};