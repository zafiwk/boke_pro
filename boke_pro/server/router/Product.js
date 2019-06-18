const server=require('express')
const router = server.Router();
const pool = require("../pool/dbpool");


router.get("/getProduct",(req,res)=>{
    pool.query("select * from product",(error,result)=>{
        if(error)
            throw error;
            res.send({code:200,msg:"查询所有商品成功",data:result})
    });
})












module.exports = router;