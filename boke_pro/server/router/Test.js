var express= require("express");
let router = express.Router();
let pool = require("../pool/dbpool")
/**
 *  标签 的router
 */

 router.get("/testUrl",(req,res)=>{
    console.log(req.query);
 });


module.exports = router;