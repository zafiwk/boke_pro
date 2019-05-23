var  mysql= require("mysql")
var pool=mysql.createPool({
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"blog",
    connectionLimit:20
})

module.exports = pool;