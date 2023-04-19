const sql = require("../models/db.js");
const fs = require("fs")
const path = require("path")
const user_data = require('./users.json');

//Gets users from database
function dbSetUp(result){
    let queries = fs.readFileSync(path.join(__dirname, 'users.sql'), { encoding: "UTF-8" })
    console.log(queries)
    sql.query(queries, (err,res) => {
        console.log(err)
        if (err) {
            result(err, null)
        }
        else {
            insertUsers(result)
            console.log('Fetching users')
        }
    })
}    

//Add a user into db
function insertUsers(result){
    let usersInsert= 'INSERT INTO USERS (UserName, PassWord, UserAdmin, FName, LName) VALUES ?'
    let usersArray=[]
    for (let u of user_data){
        usersArray.push([u.UserName, u.PassWord, u.UserAdmin, u.FName, u.LName])
    }
    console.log(usersArray)
        sql.query(usersInsert, [usersArray],
         (err,res)=> {
            if (err) {
                result(err, null)
            }
            else {
                result(res,null)
            }
        })
    }

module.exports= {insertUsers, dbSetUp, }