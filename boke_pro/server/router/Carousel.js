const express = require("express");
const router = express.Router();
const pool= require("../pool/dbpool");

router.get("/all",(req,res)=>{
    pool.query("select cid,pic,blogId,orderId from carousel  order by orderId asc",(error,result)=>{
        if(error)
            throw error;
        if(result.length>0){
            res.send({code:200,msg:"查询轮播图信息成功",data:result});
        }else{
            res.send({code:300,msg:"轮播图查询失败"});
        }
    });
})
router.post("/add",(req,res)=>{
    pool.query("inser into carousel  values(nul,?,?,?,?)",[req.body.pic,req.body.blogId,req.body.orderId],(error,result)=>{
        if(error){
            throw error;
        }
        if(result.affectedRows>0){
            res.send({code:200,msg:"添加轮播图成功"});
        }else{
            res.send({code:300,msg:"添加轮播图失败"});
        }
    });
})
router.post("/deleteById",(req,res)=>{
    pool.query("delete from carousel where cid=?",[req.body.uuid],(error,result)=>{
        if(error){
            throw error;
        }
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"})
        }else{
            res.send({code:300,msg:"删除失败"})
        }
    });
})
router.post("/updateOrder",(req,res)=>{
    let json =  JSON.parse(req.body.orderJson);

});

router.post("/updateCarousel",(req,res)=>{
    pool.query("update  carousel set pic=?,blogid=? where=?",[req.body.picId,req.body.blogId,req.body.uuid],(error,result)=>{
        if(error)
         throw error;
        if(result.affectedRows>0){
            res.send({code:200,msg:"修改元素成功"});
        }else{
            res.send({code:300,msg:"修改异常"});
        }
    });
})
module.exports =router;
