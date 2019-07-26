(() => {
    var lis = document.querySelectorAll(".catalog>ul>li")
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.onmouseover = function () {
            hideContentItem()
            let className = ".top_content_item" + (i + 1);
            let item = document.querySelector(className);
            item.className = item.className + " top_content_item_show";
            this.style.backgroundColor = "#fff";
            let a = this.children[0];
            a.style.color = "#000";
            a.className = " initial_black";
            this.style.width = "271px";
        }
    }


    // $(".catalog").mouseleave(function(){
    //     // console.log("鼠标离开了");
    //     hideContentItem();
    // });

    // $("#banner").mouseenter(function(){
    //     // console.log("鼠标进入了");
    //     hideContentItem();
    // });
    let catalog = document.getElementsByClassName("catalog")[0];
    console.log(catalog);
    catalog.onmouseleave = function (e) {
        console.log("鼠标离开了");
        hideContentItem();
    }
    let banner = document.getElementById("banner");
    banner.onmouseenter = function (e) {
        console.log("鼠标进入了");
        hideContentItem();
    }

    function hideContentItem() {
        let showLi = document.querySelector(".top_content_item_show");
        if (showLi) {
            showLi.className = showLi.className.replace("top_content_item_show", "");
        }
        for (let t = 0; t < lis.length; t++) {
            lis[t].style.backgroundColor = "#292d32";
            let a = lis[t].children[0];
            a.style.color = "#fff";
            a.className = "initial_white";
            lis[t].style.width = "270px"
        }
    }

    ajax_get("/product/getProduct", (result) => {
        let dataArray = result["data"];
        let html = "";
        for (let i = 0; i < dataArray.length; i++) {
            let model = dataArray[i];
            html += `  <li>
            <img src="${model.img}">
            <p class="title">${model.pname}</p>
            <p class="work">${model.author}</p>
            <p class="price">￥${model.price} <a href="javascript:addshopCare(${model.pid})">加入购物车</a></p>
        </li>`
        }
        let ul = document.querySelector(".book>ul");
        ul.innerHTML = html;
    });
})();
//轮播图
var i = 0;
var LIWIDTH = 900;
var DURATION = 500;
var LICOUNT = 4;
var ulImgs = document.getElementById("ul-imgs");
var ulIdxs = document.getElementById("ul-idxs");
var lis = ulIdxs.children;
function moveTo(to) {
    if (to == undefined) {
        to = i + 1;
    }
    if (i == 0) {
        if (to > i) {
            ulImgs.className = "transition"
        } else {
            ulImgs.className = "";
            ulImgs.style.marginLeft = -LIWIDTH * LICOUNT + "px";
            setTimeout(() => {
                moveTo(LICOUNT - 1);
            }, 100);
            return;
        }
    }
    i = to;
    ulImgs.style.marginLeft = -i * LIWIDTH + "px";
    for (var li of lis) {
        li.className = "";
    }
    // console.log(i);
    if (i == LICOUNT) {
        i = 0;
        setTimeout(() => {
            ulImgs.className = "";
            ulImgs.style.marginLeft = 0;
        }, DURATION);
    }
    lis[i].className = "active";
}

var btnLeft = document.getElementById("btn-left");
var btnRight = document.getElementById("btn-right");
var canClick = true;
btnRight.onclick = function () {
    move(1);
}
function move(n) {
    if (canClick) {
        // console.log(i + n);
        moveTo(i + n);
        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, DURATION);
    }
}
btnLeft.onclick = function () {
    move(-1);
}

var interval = 3000;
var timer = setInterval(() => {
    moveTo();
}, 3000);
var banner = document.getElementById("banner");
banner.onmouseover = function () {
    clearInterval(timer);
}
banner.onmouseout = function () {
    timer = setInterval(() => {
        moveTo()
    }, 3000);
}
var ulIdxs = document.getElementById("ul-idxs");
canClick = true;
ulIdxs.onclick = function (e) {
    if (canClick) {
        var li = e.target;
        if (li.nodeName = "LI") {
            if (li.className !== "active") {
                for (var i = 0; i < lis.length; i++) {
                    if (lis[i] == li) {
                        break;
                    }
                }
                moveTo(i);
                setTimeout(() => {
                    canClick = true;
                }, DURATION);
            }
        }
    }
}

function addshopCare(pid) {
    // console.log(pid);
    ajax_post("/shopcar/addProdu", (result) => {

        if (result.code == 201) {
            alert("请登录");
            location.href = "/userlogin.html"
        } else {
            alert("添加成功");
        }
    }, "produId=" + pid)
}
topRightInit();