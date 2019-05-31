const express = require("express");
const router =express.Router();
const pool =require('../pool/dbpool')
const multer = require("multer");
const fs  =  require("fs")
var path = require("path")

router.post("/upfile",multer({
    dest:'./public/upload'
}).single("upload"),function(req,res,next){
    //开始文件上传
    console.log("文件上传");
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.send("error", {message: "上传文件不能为空！"});
        return
    } else {
       let file = req.file;
    //    let fileInfo = {};
    //    console.log(file);

    var rootPath=path.dirname(__dirname);
    var extname  = path.extname(file.originalname);
    var picRoot = rootPath +path.sep+"public"+path.sep+"upload"+path.sep;
    //console.log("file.filename"+file.filename);//文件名字已经做了防重复处理
    //console.log("file.originalname"+file.originalname);
    fs.renameSync(picRoot+ file.filename, picRoot + file.filename+extname);//这里修改文件名字，比较随意。
       // 获取文件信息
    //    fileInfo.mimetype = file.mimetype;
    //    fileInfo.originalname = file.originalname;
    //    fileInfo.size = file.size;
    //    fileInfo.path = file.path;

       // 设置响应类型及编码
    //    res.set({
        //  'content-type': 'application/json; charset=utf-8'
    //    });
    //    res.end("上传成功！");
        var  imageUrl ="/upload/"+file.filename+extname;
        console.log("图片上传的url:"+imageUrl);
        res.send({"uploaded":1,"url":imageUrl, "fileName":file.filename+extname});
    }
});


// router.post("/add",(req,res)=>{

// });
module.exports =router;