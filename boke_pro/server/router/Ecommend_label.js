const express = require("express");
const router = express.Router();
const pool  = require("../pool/dbpool")

//添加
router.post("/add",(req,res)=>{
    pool.query("inert into ecommend_label values(null,?,?,?)",[req.body.blogId,req.body.orderId,req.body.labelId],(error,result)=>{
        if(result.effenctedRows>0){
            res.send({code:200,msg:"数据添加成功"})
        }else{
            res.send({code:300,msg:"数据添加失败"})
        }
    });

});

//查询
router.get("queryByLabelId",(req,res)=>{
    pool.query("select * from ecommend_label where labelId=?",[req.query.labelId],(error,result)=>{
        if(error){
            throw error;
        }
        if(result.length>0){
            res.send({code:200,msg:"查询正确",data:result});
        }else{
            res.senf({code:300,msg:"查询失败"})
        }
    });
});

//通过id删除
router.post("deleteById",(req,res)=>{
    pool.query("delect from ecommend_label where eid=?",[req.body.uuid],(error,result)=>{
        if(error){
            throw error;
        }
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"});
        }else{
            res.send({code:300,msg:"删除失败"});
        }
    })
})












module.exports=router