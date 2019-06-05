const express = require("express");
const router = express.Router();
const pool = require("../pool/dbpool");
const path = require("path");

router.post("/add", (req, res) => {
    var date = new Date();
    // console.log("===============================================================");
    // console.log(req.body);
    // console.log("毫秒时间:"+date.toLocaleDateString());
    pool.query("insert into blogs(btitle,bcontent,btiem,labelId,bclick) values(?,?,?,?,?)", [req.body.title, req.body.content, date.toLocaleDateString(), req.body.bokeType, 0], (error, result) => {
        if (error)
            throw error;
        if (result.affectedRows > 0) {
            // console.log("添加博客数据"+result);
            // res.send({code:200,msg:"添加成功"})
            pool.query("select max(bid)  from blogs", (error, result) => {
                console.log(result);
                var bid = result[0]["max(bid)"];
                console.log("bid:" + bid);
                var content = req.body.content;

                var reg = /src=\"+[0-9a-z./]*\"+/gi;
                do {
                    var regObject = reg.exec(content);
                    if (regObject != null) {
                        str = regObject[0];
                        console.log("=====================" + str);
                        var imgeUrl = str.split("\"")[1];
                        pool.query("insert into filemap(blogId,localStr)  values(?,?)", [bid, imgeUrl], (error, result) => {
                        });
                    } else {
                        break;
                    }
                } while (true)
                var rootPath = path.dirname(__dirname);
                var filePath = rootPath + path.sep + "input.html";
                res.sendFile(filePath);
            });
        } else {
            res.send({ code: 300, msg: "添加异常" })
        }
    });
});

//查询数据
router.get("/queryById", (req, res) => {
    var bid = req.query.bid;
    pool.query("select * from blogs where bid=? ", [bid], (error, result) => {
        if (error)
            throw error;
        if (result.length == 0) {
            res.send({ code: 300, msg: "查询结果为空" })
            return
        }
        res.send({ code: 200, msg: "查询博客", data: result });
    });
});


//修改点击量
router.get("/updateClickCount", (req, res) => {
    var bid = req.query.bid;
    var count = parseInt(req.query.count) + 1;
    pool.query("update blogs set bclick=? where bid=?", [count, bid], (error, result) => {
        if (error)
            throw error;
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: "修改成功" })
        } else {
            res.send({ code: 300, msg: "修改异常" })
        }
    });
});
//查询一个标题的数据
router.get("/queryByTypeId", (req, res) => {
    var typeId = req.query.typeId;
    pool.query("select * from blogs where labelId=? order by btiem desc limit 0,6 ", [typeId], (error, result) => {
        if (error)
            throw error;
        if (result.length == 0) {
            res.send({ code: 300, msg: "查询结果为空" })
            return
        }
        res.send({ code: 200, msg: "查询博客", data: result });
    });
});

//获取置顶博客
router.get("/getTopBoke", (req, res) => {
    pool.query("select * from blogs where bid=(select blogId from stick where sid = 1 )", (error, result) => {
        if (error)
            throw error;
        if (result.length == 0) {
            res.send({ code: 300, msg: "置顶博客获取失败" })
        } else {
            res.send({ code: 200, msg: "置顶博客获取成功", data: result });
        }

    });
});

//收藏博客
router.post("/addCollect", (req, res) => {
    if (req.session.islogin) {
        // var rootPath=path.dirname(__dirname);
        // var filePath=rootPath+path.sep+"shoucang.html";
        // res.sendFile(filePath);
        var bid = req.body.bid;
        var uid = req.session.uid;
        pool.query("select * from shoucang where uid=? and bid=?", [uid,bid], (error, result) => {
            if(error)
                throw error;
            if (result.length == 0) {
                pool.query("insert into shoucang(uid,bid) values(?,?)", [uid, bid], (error, result) => {
                    if (error)
                        throw error;
                    if (result.affectedRows > 0) {
                        res.send({ code: 200, msg: "保存成功" });
                    } else {
                        res.send({ code: 300, msg: "添加失败" });
                    }
                });
            } else {
                res.send({ code: 300, msg: "文章已经被收藏过" });
            }
        })
    } else {
        // res.redirect("/userlogin.html");
        res.send({code:201,msg:"没有登录 跳转到登录页面",url:"/userlogin.html"})
    }
});


//获取所有收藏博客
router.post("/getAllCollect", (req, res) => {
    var uid = req.session.uid;
    // pool.query("select * from shoucang where uid=?", [uid], (error, result) => {
    //     if (error)
    //         throw error;
    //     // if(result.length==0){
    //     //     res.send({code:300,msg:"收藏列表获取失败"});
    //     // }else{
    //     //     res.send({code:200,msg:"收藏列表获取成功",data:result});
    //     // }

    //     var sid = [];
    //     for (let i = 0; i < result.length; i++) {
    //         var model = result[i];
    //         console.log("文章id"+model.bid);
    //         sid.push(model.bid);
    //     }
    //     console.log("主键列表:"+sid.join(","));
    //     pool.query("select bid,btitle  from blogs where bid in (?)", sid.join(","), (error, result) => {
    //         console.log("获取收藏数目" + result.length);
    //         // res.send(result);
    //     });
    // });
    pool.query("select bid,btitle  from blogs where bid in (select bid from shoucang where uid=?)", [uid],(error,result)=>{
        if (error)
         throw error;
        res.send({code:200,msg:"获取",data:result});
    });
});

//删除收藏
router.post("/deleteCollect", (req, res) => {
    var bid = req.body.bid;
    var uid = req.session.uid;
    pool.query("delete from shoucang where bid=? and uid=?",[bid,uid],(error,result)=>{
        if(error)
            throw error;
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"});
        }else{
            res.send({code:202,msg:"删除异常"});
        }
        


    });
    // pool.query("delete from shoucang where sid=?", [collectId], (error, result) => {
    //     if (error)
    //         throw error;
    //     if (result.affectedRows > 0) {
    //         res.send({ code: 200, msg: "删除成功" });
    //     } else {
    //         res.send({ code: 300, msg: "删除异常" });
    //     }
    // });
});

//获取点击量前4博客
router.get("/getClickTop4",(req,res)=>{
    pool.query("select bid,btitle from blogs  order by bclick desc limit 0,4 ",(error,result)=>{
        if(error)
            throw error;
        res.send({code:200,msg:"点击量数前4据查询成功",data:result})
    });
});

//获取站长推荐
router.get("/commenblog",(req,res)=>{
    pool.query("select * from blogs where bid in (select blogId from ecommend_blogs order by orderId ) limit 0,7",(error,result)=>{
        if(error)
            throw error;
        res.send({code:200,msg:"站长推荐查询成功",data:result});

    });
})


//按照时间顺序获取boke
router.get("/getblog",(req,res)=>{
    var count =parseInt(req.query.count);
    console.log("count:"+count);
    pool.query("select * from blogs order by btiem desc limit 0,? ",[count],(error,result)=>{
        if(error)
            throw error;
        if(result.length>0){
            res.send({code:200,msg:"时间降序查询boke成功",data:result});
        }else{
            res.send({code:300,msg:"查询博客数据异常"});
        }
        // res.send(result);
    });
});



router.post("/updateClick",(req,res)=>{
    var bid = req.body.bid;
    pool.query("select bclick from blogs where bid=?",[bid],(error,result)=>{
        if(error)
            throw error;
        if(result.length>0){
            var clickCount = parseInt(result[0]["bclick"])+1;
            console.log("点击量"+clickCount);

        }
    })
});
module.exports = router;