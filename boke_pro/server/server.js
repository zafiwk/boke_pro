const express=   require("express");
const server = express();
const bodyParser = require("body-parser") ;

const userRouter = require("./router/UserRouter");
const labelRouter = require("./router/LabelRouter");
const carousel = require("./router/Carousel");
const ecommend_blogs = require("./router/Ecommend_blogs");
const stick = require("./router/Stick")
const ecommend_label=require("./router/Ecommend_label");
server.listen(8080);

server.use("/",express.static("public"));
server.use(bodyParser.urlencoded({
    extended:false 
}));

server.use("/admin",userRouter);
server.use("/label",labelRouter);
server.use("/carousel",carousel);
server.use("/ecommend_blogs",ecommend_blogs);
server.use("/stick",stick);
server.use("/ecommend_label",ecommend_label);