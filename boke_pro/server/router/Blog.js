const express = require("express");
const router = express.Router();
const pool = require("../pool/dbpool");
const path = require("path");

router.post("/add", (req, res) => {
    var date = new Date();
    console.log("===============================================================");
    console.log(req.body);
    console.log("毫秒时间:"+date.toLocaleDateString());
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
        res.send({ code: 200, msg: "查询博客", data: result[0] });
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
        res.send({ code: 200, msg: "查询博客", data: result});
    });
});

module.exports = router;