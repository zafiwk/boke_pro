const express = require("express");
const router =express.Router();
const pool =require('../pool/dbpool')

router.get("/getTop6",(req,res)=>{
    pool.query("select eid,blogId,orderId  from ecommend_blogs",(error,result)=>{
        if(error)
            throw error;
        if(result.length==0){
            res.send({code:300,msg:"查询结果为空"})
            return 
        }
        let newArr = null;
        if(result.length<7){
            newArr=result;
        }else{
            newArr=result.slice(0,6);
        }
        res.send({code:200,msg:"查询前6条成功",data:newArr});
    });
});



router.post("/deleteById",(req,res)=>{
    pool.query("delete from ecommend_label where eid=?",[req.body.uuid],(error,result)=>{
        if(error)
         throw error;
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"})
        }else{
            res.send({code:300,msg:"删除异常"})
        }

    });
});

router.post("/add",(req,res)=>{
  
});


router.post("/updateOrder",(req,rsp)=>{

})

router.post("/updateCommend",(req,res)=>{
    pool.query("update set blogId=? where eid=?",[req.body.blogId,req.body.uuid],(error,result)=>{
        if(error)
            throw error;
        if(result.length>0){
            res.send({code:200,msg:"修改成功"})
        }else{
            res.senf({code:300,msg:"修改异常"})
        }
    });
})

module.exports = router;