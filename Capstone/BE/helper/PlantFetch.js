const sql = require("../models/db.js");
const fs = require("fs")
const path = require("path")
const plant_data = require('./plants.json');

//Gets all plants from db
function dbSetUp(result){
    let queries = fs.readFileSync(path.join(__dirname, 'plants.sql'), { encoding: "UTF-8" })
    console.log(queries)
    sql.query(queries, (err,res) => {
        console.log(err)
        if (err) {
            result(err, null)
        }
        else {
            insertPlants(result)
            console.log('Fetching plants')
        }
    })
}    

//Add a plant into database
function insertPlants(result){
    let plantsInsert= 'INSERT INTO PLANTS (PlantIMGURL, PlantCName, PlantLName, PlantVitamins, PlantMinerals, PlantPharmaProps, PlantDesc) VALUES ?'
    let plantsArray=[]
    for (let p of plant_data){
        plantsArray.push([p.PlantIMGURL, p.PlantCName, p.PlantLName, p.PlantVitamins, p.PlantMinerals, p.PlantPharmaProps, p.PlantDesc])
    }
    console.log(plantsArray)
        sql.query(plantsInsert, [plantsArray],
         (err,res)=> {
            if (err) {
                result(err, null)
            }
            else {
                result(res,null)
            }
        })
    }

module.exports= {insertPlants, dbSetUp, }