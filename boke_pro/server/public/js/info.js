//    <h1 id="title">如何写一段好大的博客标题</h1>
//     <p class="subTitle" id="subTitle">心得体会</p>
//     <p class="time" id="time">发表时间2019:5:31</p>
//     <p class="count">阅读量:88822</p>
//     <div class="content" id="content">
var urlParams = new URLSearchParams(location.search);
var bid = urlParams.get("bid");
var bokeUrl = "/blog/queryById?bid=" + bid;
ajax_get(bokeUrl, (obj) => {
    var model = obj["data"][0];
    console.log(model);

    title.innerHTML = model.btitle;
    subTitle.innerHTML = getLableByNunber(model.labelId)
    content.innerHTML = model.bcontent;
    var date = new Date(model.btiem);
    time.innerHTML = "发表时间:" + date.toLocaleDateString();
});

function shoucang() {
    var body = "bid=" + bid;
    ajax_post("/blog/addCollect", (obj => {
        console.log("返回的数据对象" + obj);
        if (obj["code"] == 201) {
            var url = obj["url"]
            alert("请登录")
            window.location.href = url;
        } else {
            alert('收藏成功');
        }
    }), body)
}
var urlParams = new URLSearchParams(location.search);
var bid = urlParams.get("bid");
ajax_post("/blog/updateClick", (result) => {
    // console.log("点击量:" + result["data"]);
    count.innerHTML = "点击量:" + result["data"];
}, "bid=" + bid);
topRightInit();

function loadPinglun() {
    ajax_get("/blog/pinglun" + "?blogId=" + bid, (result) => {
        console.log(result);
        let ul = document.querySelector(".yonghupinglun > ul");
        let html = "";

        for (let i = 0; i < result["data"].length; i++) {
            let model = result["data"][i];
            let date = new Date(model.ptime);
            html += `
                <li data-id=${model.pid}>
                <div>
                            <span class="uName"  data-id-"15">用户：${model.uanme}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="ptime">时间:${date.toLocaleString()}</span>
                        </div>
                        <div class="plContent">
                           评论:${model.content}
                        </div>
                </li>
                `
        }
        ul.innerHTML = html;
    }, null)
}
loadPinglun();


let inputBtn = document.getElementsByClassName("inputBtn")[0];
inputBtn.onclick = function () {
    let uName = document.cookie.split("=")[1];
    if (uName && uName.length != 0) {
        let inputText = document.getElementsByClassName("inputText")[0]
        let content = inputText.value;
        if (content.length == 0) {
            alert("评论为空");
            return;
        }
        // console.log(content);
        // let blogId =req.body.blogId;
        // let content = req.body.content;
        ajax_post("/blog/addComment", (result) => {
            inputText.value = "";
            loadPinglun();
        }, "blogId=" + bid + "&content=" + content);
    } else {
        alert("请登录")
        location.href = "/userlogin.html";
    }
}