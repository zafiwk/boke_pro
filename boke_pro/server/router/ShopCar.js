const exporess = require("express");
const router = exporess.Router();
const pool = require("../pool/dbpool");



router.get("/getShopCarData", (req, res) => {
    var uid = req.session.uid;
    pool.query("select * from shopcar where uid=?", [uid], (error, result) => {
        if (error)
            throw error;
        res.send({ code: 200, msg: "购物车查询成功", data: result });
    });
});



router.post("/updateShopCar", (req, res) => {
    // var uid = req.session.uid;
    // var produId = req.body.produId;
    var shopcarId = req.body.shopcarId;
    var produSize = req.body.size;
    if (produSize > 0) {
        pool.query("update shopcar set size=? where sid=?", [produSize, shopcarId], (error, result) => {
            if(error)
                throw error;
            res.send({code:200,msg:"修改成功"});

        })
    }else{
        pool.query("delete from shopcar where sid=?",[shopcarId],(error,resulte)=>{
            if(error){
                throw error;
            }
            res.send({code:200,msg:"删除成功"})
        });
    }
});


router.post("/addProdu",(req, res)=>{
    var uid = req.session.uid;
    if(!req.session.islogin){
        res.send({code:201,msg:"请登录"});
        return;
    }

    var produId = req.body.produId;
    pool.query("select *  from  shopcar where pid=? and uid=?",[produId,uid],(error,result)=>{
        if(error)
            throw error;
        if(result.length>0){
            var size= parseInt(result[0]["size"])+1;
            var sid = parseInt(result[0]["sid"]);
            pool.query("update shopcar set size=? where sid=?",[size,sid],(error,result)=>{
                if(error){
                    throw error;
                }
                res.send({code:200,msg:"商品数量修改成功"})
            })
        }else{
            pool.query("insert into shopcar(uid,pid,size) values(?,?,1)",[uid,produId],(error,result)=>{
                if(error){
                    throw error;
                }
                res.send({code:200,msg:"成功添加到购物车"});
            })
        }
    });
})



module.exports = router;