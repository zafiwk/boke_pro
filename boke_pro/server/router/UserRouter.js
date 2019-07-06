const express = require("express");
const router = express.Router();
const pool = require("../pool/dbpool")
var path = require('path')
// 安全考关闭添加模块
// router.post("/add",(req,res)=>{
//     const sql="insert into user(state,recommend,prodession,emain,icon,pwd) "
//     +"values(?,?,?,?,?,?)"
//     pool.query(sql,[req.body.state,req.body.recommend,req.body.prodession,req.body.emain,req.body.icon,req.body.pwd],(error,result)=>{
//         if(error)
//             throw error;
//         console.log(result);
//         if(result.affectedRows>0){
//             res.send({code:200,msg:"添加成功"})
//         }else{
//             res.send({code:300,msg:"出现了异常"})
//         }

//     })

// });


router.post("/update", (req, res) => {
    const sql = "update user set statue=?,recommend=?,prodession=?,emain=?,icon=?,pwd=?"
    pool.query(sql, [req.body.state, req.body.recommend, req.body.prodession, req.body.emain, req.body.icon, req.body.pwd], (error, result) => {
        if (error)
            throw error;
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: "修改成功" })
        } else {
            res.send({ code: 300, msg: "出现了异常" })
        }
    });

});


router.get("/select", (res, rsp) => {
    const sql = "select state,recommend,prodession,emain,icon from user"
    pool.query(sql, (error, result) => {
        if (error)
            throw error;
        if (result.length > 0) {
            res.send({ code: 200, msg: "获取用户信息成功", data: result });
        } else {
            res.send({ code: 300, msg: "出现了异常" })
        }
    })
})

router.post("/login", (req, res) => {
    // let $uname=req.body.uname;
    // let $pwd = req.body.pwd;
    // const sql="select * from user where pwd=?";
    // pool.query(sql,(error,result)=>{
    //     if(result.length>0){
    //         res.send({code:200,msg:"登入成功"});
    //     }else{
    //         res.send({code:300,msg:"出现了异常"})
    //     }
    // })
    // res.redirect("./input.html")  
    // console.log(__dirname+"/../input.html");
    // res.sendFile("../input.html");

    // console.log("__dirname:"+__dirname);
    // var p=__dirname;
    // var filePath= path.relative(p,"..");
    // console.log(filePath);
    var pwd = req.body.pwd;
    pool.query("select *  from user where emain = 'root' and pwd = ?", [pwd], (error, result) => {
        if (error)
            throw error;
        if (result.length > 0) {
            var rootPath = path.dirname(__dirname);
            var filePath = rootPath + path.sep + "input.html";
            res.sendFile(filePath);
        } else {
            res.redirect("/error.html")
        }
    });
});

router.get("/shoucang", (req, res) => {
    if (req.session.islogin) {
        var rootPath = path.dirname(__dirname);
        var filePath = rootPath + path.sep + "shoucang.html";
        res.sendFile(filePath);
    } else {
        res.redirect("/userlogin.html");
    }
});

router.post("/userLogin", (req, res) => {
    var user = req.body.uname;
    var pwd = req.body.pwd;
    pool.query("select * from user where emain=? and pwd=?", [user, pwd], (error, result) => {
        if (error)
            throw error;
        if (result.length > 0) {
            req.session.islogin = true;
            req.session.uid = result[0]["uid"];
            req.session.uname = result[0]["emain"];
            res.cookie("uname", result[0]["emain"]);
            res.send({ code: 200, msg: "登录成功" })
        } else {
            res.send({ code: 300, msg: "账号或者密码错误" });
        }
    })
});

router.post("/register", (req, res) => {
    var user = req.body.uname;
    var pwd = req.body.pwd;
    pool.query("insert into user(emain,pwd)  values(?,?)", [user, pwd], (error, result) => {
        if (error)
            throw error;
        if (result.affectedRows > 0) {
            pool.query("select * from user where emain=? and pwd=?", [user, pwd], (error, result) => {
                if (error)
                    throw error;
                if (result.length > 0) {
                    req.session.islogin = true;
                    req.session.uid = result[0]["uid"];
                    req.session.uname = result[0]["emain"];
                    res.cookie("uname", result[0]["emain"]);
                    res.send({ code: 200, msg: "注册成功" })
                } else {
                    res.send({ code: 300, msg: "注册失败" });
                }
            })
        } else {
            res.send({ code: 300, msg: "注册失败" });
        }
    })
});

router.post("/userIsExists", (req, res) => {
    var user = req.body.uname;
    pool.query("select * from user where emain=?", [user], (error, result) => {
        if (error)
            throw error;
        if (result.length > 0) {
            res.send({ code: 200, msg: "用户存在" })
        } else {
            res.send({ code: 200, msg: "用户不存在" });
        }
    })
});


router.get("/loginOut", (req, res) => {
    req.session.islogin = false;
    req.session.uid = "";
    req.session.uname = "";
    res.cookie("uname", "");
    res.redirect("/");
})

module.exports = router;