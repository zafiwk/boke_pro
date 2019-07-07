var  mysql= require("mysql")
var pool=mysql.createPool({
    user:"root",
    password:"123456",
    port:"3306",
    host:"localhost",
    database:"blog",
    connectionLimit:20
})

module.exports = pool;