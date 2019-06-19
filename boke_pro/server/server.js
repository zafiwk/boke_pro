const express=   require("express");
const server = express();
const bodyParser = require("body-parser") ;
const session = require("express-session")

const userRouter = require("./router/UserRouter");
const labelRouter = require("./router/LabelRouter");
const carousel = require("./router/Carousel");
const ecommend_blogs = require("./router/Ecommend_blogs");
const stick = require("./router/Stick")
const ecommend_label=require("./router/Ecommend_label");
const test=require("./router/Test");
const fileUpload =require("./router/FileUpload")
const blog = require("./router/Blog")
const product = require("./router/Product")
const shopcar = require("./router/ShopCar")
server.listen(8080);

server.use("/",express.static("public"));
// server.use(express.static("public"));
server.use(bodyParser.urlencoded({
    extended:false 
}));

server.use(session({
    secret:'sdsaewrw ewreecret',//对sessionId 相关cookie进行签名
    resave:false,
    saveUninitialized:false
}));

server.use("/admin",userRouter);
//server.use("/label",labelRouter);
server.use("/carousel",carousel);
server.use("/ecommend_blogs",ecommend_blogs);
server.use("/stick",stick);
server.use("/ecommend_label",ecommend_label);
server.use("/test",test);
server.use("/upload",fileUpload);
server.use("/blog",blog);
server.use("/product",product);
server.use("/shopcar",shopcar)