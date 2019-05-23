const express = require("express");
const pool = require("../pool/dbpool")
const router = express.Router();
router.get("/getAll",(req,res)=>{
    pool.query("select * from blogs where bid = (select sid from stick )",(error,result)=>{
        if(result.length>0){
            res.send({code:200,msg:"查询置顶成功"});
        }else{
            res.send({code:300,msg:"查询失败"})
        }
    });
});







module.exports = router;