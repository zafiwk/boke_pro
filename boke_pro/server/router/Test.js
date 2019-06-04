var express= require("express");
let router = express.Router();
let pool = require("../pool/dbpool")

/**
 *  标签 的router
 */

 router.get("/testUrl",(req,res)=>{
    // res.send(req.query);
  //  var  content =   JSON.parse(req.query);
  //  res.send(req.query["content"])
  res.send(req.query["content"]);
 });

module.exports = router;