const sql = require("./db.js");

// constructor
//Creates a new plant
const Plants = function(plants) {
  this.PlantIMGURL = plants.PlantIMGURL;
  this.PlantCName = plants.PlantCName;
  this.PlantLName = plants.PlantLName;
  this.PlantVitamins = plants.PlantVitamins;
  this.PlantMinerals = plants.PlantMinerals;
  this.PlantPharmaProps = plants.PlantPharmaProps;
  this.PlantDesc = plants.PlantDesc;
};

Plants.create = (newPlant, result) => {
  sql.query("INSERT INTO plants SET ?", newPlant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plant: ", { id: res.insertId, ...newPlant });
    result(null, { id: res.insertId, ...newPlant });
  });
};

//Gets all plants
Plants.getAll = (PlantCName, limit, offset, result) => {
  let query = "SELECT * FROM plants";

  if (PlantCName) {
    query += ` WHERE PlantCName LIKE '%${PlantCName}%'`;
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

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets plant by id
Plants.getOne = (id, result) => {
  let query = "SELECT * FROM plants";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets plants by starting letters
Plants.getByStartingLetter = (letters, result) => {
  // const lettersString = letters.join(',')
  console.log(letters)
  let query = "SELECT * FROM plants";

  if (letters) {
    query += ` WHERE PlantCName LIKE "%${letters.replace(',','%')}%"`;
  }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets plants by vitamins
Plants.getByVitamins = (letters, result) => {
  // const lettersString = letters.join(',')
  console.log(letters)
  let query = "SELECT * FROM plants";

  if (letters) {
    query += ` WHERE PlantVitamins LIKE "%${letters.replace(',','%')}%"`;
  }
  // if (letters) {
  //   query += ` WHERE PlantVitamins LIKE "%${lettersString}%"`
  // }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets all plants by vitamins
Plants.getAllVitamins = (result) => {
  let query = "SELECT PlantVitamins FROM plants";
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets plants by minerals
Plants.getByMinerals = (letters, result) => {
  let query = "SELECT * FROM plants";

  if (letters) {
    query += ` WHERE PlantMinerals LIKE "%${letters.replace(',','%')}%"`;
  }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets all plants by minerals
Plants.getAllMinerals = (result) => {
  let query = "SELECT PlantMinerals FROM plants";
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets plants by pharma features
Plants.getByPharma = (letters, result) => {
  let query = "SELECT * FROM plants";

  if (letters) {
    query += ` WHERE PlantPharmaProps LIKE "%${letters.replace(',','%')}%"`;
  }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Gets all plants by pharma features
Plants.getAllPharma = (result) => {
  let query = "SELECT PlantPharmaProps FROM plants";
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Updates a plant by id
Plants.updateOne = (id, newPlantCName, newPlantLName, newPlantVitamins, newPlantMinerals,newPlantPharmaProps, newPlantIMGURL, NewPlantDesc, result) => {
  let query = "update plants set";

  let comma = false
  if (newPlantIMGURL){
    query += ` PlantIMGURL="${newPlantIMGURL}"`;
    comma=true 
  }
  if (newPlantCName) {
    query += (comma?', ' : ' ')+`PlantCName='${newPlantCName}'`;
    comma=true 
  }
  if (newPlantLName) {
    query += (comma?', ' : ' ')+`PlantLName='${newPlantLName}'`;
    comma=true 
  }
  if (newPlantVitamins){
    query += (comma?', ' : ' ')+`PlantVitamins="${newPlantVitamins}"`;
    comma=true 
  }
  if (newPlantMinerals){
    query += (comma?', ' : ' ')+`PlantMinerals="${newPlantMinerals}"`;
    comma=true 
  }
  if (newPlantPharmaProps){
    query += (comma?', ' : ' ')+`PlantPharmaProps="${newPlantPharmaProps}"`;
    comma=true 
  }
  if (NewPlantDesc){
    query += (comma?', ' : ' ')+`PlantDesc="${NewPlantDesc}"`;
  }
  query +=  ` WHERE id=${id}`
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Deletes a plant by id
Plants.deleteOne = (id,result) => {
  let query = "DELETE FROM plants";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Deletes all plants
Plants.deleteAll = (result) => {
  let query = "DELETE FROM plants";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Locks all plants
Plants.lockAll = (result) => {
  let query = "LOCK TABLES plants read";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

//Unlocks all plants
Plants.unlockAll = (result) => {
  let query = "UNLOCK TABLES";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("plants: ", res);
    result(null, res);
  });
};

module.exports = Plants;