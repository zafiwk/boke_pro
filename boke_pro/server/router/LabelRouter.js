var express= require("express");
let router = express.Router();
let pool = require("../pool/dbpool")
/**
 *  标签 的router
 */

 router.get("/getAll",(req,res)=>{
    pool.query("select lid,name form label",(error,rsult)=>{
        if(error)
         throw error;
         if(result.length>0){
            res.send({code:200,msg:"获取所有标签成功",data:result})
         }else{
            res.send({code:300,msg:"获取所有标签失败",})
         }
    })
 });

 router.get("/queryLabelById",(req,res)=>{
    pool.query("select name from label where lid =?",[req.bodu.uuid],(error,result)=>{
        if(error)
            throw error;
       if(result.length>0){
         res.send({code:200,msg:"查询标签结果成功",data:result});
       }else{
         res.send({code:300,msg:"查询异常"});
       }
    });
 })

 router.post("/addLabel",(req,res)=>{
    pool.query("insert into label(name)  values(?)",[req.body.name],(error,result)=>{
        if(error){
            throw error;
        }
        if(result.affectedRows>1){
           res.send({code:200,msg:"添加成功"});
        }else{
           res.send({code:300,msg:"查询异常"});
        }
    });

 })

router.post("/update",(req,res)=>{
    pool.query("update label set name =? where lid=?",[req.body.name,req.body.uuid],(error,result)=>{
        if(result.affectedRows>0){
            res.send({code:200,msg:"修改标签成功"});
        }else{
            res.send({code:300,msg:"修改标签失败"});
        }
    });
});

router.post("/delete",(req,res)=>{
    pool.query("delete from label where lid =?",[req.body.uuid],(error,result)=>{
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"});
        }else{
            res.send({code:300,msg:"删除失败"});
        }
    });
})
module.exports = router;