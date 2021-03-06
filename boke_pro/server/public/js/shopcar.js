(() => {
    // let foot=document.getElementsByClassName("bodyfooter-shopcar")[0];
    // console.log(foot.clientTop);
    // console.log(foot.clientHeight);
    // console.log(foot.getBoundingClientRect());
    // console.log(document.body.getBoundingClientRect());
    // console.log(document.documentElement.scrollHeight);
    // console.log(window.innerHeight)
    //x\y:元素的左上角和父元素左上角的距离
    //width/height:边框 + 内边距 + 内容框
    //top:元素的上边界和父元素上边界的距离
    //left:元素的左边界和父元素左边界的距离
    //right:元素的右边界和父元素的左边界的距离
    //bottom:元素的下边界和父元素上边界的距离
    // warpShopcar.style.background="red";
    window.onresize = function () {
        let warpShopcar = document.getElementsByClassName("warp-shopcar")[0];
        warpShopcar.style.minHeight = window.innerHeight - 300 - 5 - 56 - 20 - 2 + "px"
    }
    let warpShopcar = document.getElementsByClassName("warp-shopcar")[0];
    warpShopcar.style.minHeight = window.innerHeight - 300 - 5 - 56 - 20 - 2 + "px"

    ajax_get("/shopcar/getShopCarData", (result) => {
        loadData(result);
    });


})();

function totalPriceAndCount() {
    let buy_dianhovers = document.getElementsByClassName("buy_dianhover");
    let total = 0;
    let count = 0
    for (let buy_dianhover of buy_dianhovers) {
        if (buy_dianhover.className.indexOf("buy_dianhover_gouxuan") != -1) {
            // console.log(buy_dianhover.parentElement.parentElement.getElementsByClassName("li_jg")[0].innerHTML);
            let price = buy_dianhover.parentElement.parentElement.getElementsByClassName("li_jg")[0].innerHTML.slice(1);
            // console.log(price);
            total += parseFloat(price);
            // console.log(buy_dianhover.parentElement.parentElement.getElementsByClassName("buy_inp")[0].value);
            count += parseInt(buy_dianhover.parentElement.parentElement.getElementsByClassName("buy_inp")[0].value)
        }
    }
    // console.log("总价  购物车数量");
    // console.log(total, "-------------------", count);
    document.getElementsByClassName("cfb6 f16")[0].innerHTML = total.toFixed(2);
    document.getElementsByClassName("numcount")[0].innerHTML = count.toFixed(2);

    if (total >= 199) {
        document.getElementById("isFreeSpan").style.display = "none"
        document.getElementsByClassName("buy_you2")[0].style.display = "block"
        document.getElementsByClassName("buy_you1")[0].style.display = "none"

    } else {
        document.getElementById("isFreeSpan").style.display = "inline-block"
        document.getElementsByClassName("buy_you2")[0].style.display = "none"
        document.getElementsByClassName("buy_you1")[0].style.display = "block"
    }
}
function deletePro(sid) {
    console.log(this);
    if (confirm("是否删除商品")) {
        ajax_post("/shopcar/deleteShopCar", (result) => {
            console.log(result);
            // console.log("ajax请求返回成功");
            // console.log(this);
            loadData(result);
            totalPriceAndCount();
        }, "sid=" + sid)
    }
}

function deleteShopCar() {
    if (confirm("是否清空购物车")) {
        // console.log("删除购物车")
        ajax_post("/shopcar/deleteShopCar", (req, res) => {
            // alert("清空完成");
            let html = `             <ul>
            <li class="li_inp">
                <div class="buy_xuan">全选</div>
            </li>
            <li class="li_sp">商品数量</li>
            <li class="li_dj">单价(元)</li>
            <li class="li_sl">数量</li>
            <li class="li_jg">小计</li>
            <li class="li_zz">操作</li>
        </ul>`;
            html += ` <ul class="clearshopcar">
            <li class="li_inp">
                <div class="buy_xuan">全选</div>
            </li>
            <li class="li_sp">&nbsp;</li>
            <li class="li_dj">&nbsp;</li>
            <li class="li_sl">&nbsp;</li>
            <li class="li_jg">&nbsp;</li>
            <li class="li_zz"><a href="javascript:deleteShopCar();">清空购物车</a></li>
        </ul>`
            let productList = document.getElementsByClassName("productList")[0];
            productList.innerHTML = html;

            totalPriceAndCount();
        }, null);
    }
}

function loadData(result) {
    let html = `
    <ul>
            <li class="li_inp">
                <div class="buy_xuan">全选</div>
            </li>
            <li class="li_sp">商品数量</li>
            <li class="li_dj">单价(元)</li>
            <li class="li_sl">数量</li>
            <li class="li_jg">小计</li>
            <li class="li_zz">操作</li>
        </ul>`;
    for (let i = 0; i < result["data"].length; i++) {
        let model = result["data"][i];
        html += ` <ul class="buylist">
                <li class="li_inp">
                    <div class="buy_dianhover">选择</div>
                </li>
                <li class="li_sp">
                    <div>
                        <img class="j-img" src="${model.product.img}">
                    </div>
                    <div>
                        <span class="buysp_wen">${model.product.pname}</span>
                        <span class="c999">${model.product.author}</span>
                    </div>
                </li>
                <li class="li_dj"><span class="j-price">￥${model.product.price}</span></li>
                <li class="li_sl">
                    <div class="buysl">
                        <a class="jian_cart" href="javascript:;" onclick="jiancart(${model.sid},${i})">-</a>
                        <input type="text" class="buy_inp" readonly value="${model.size}" maxlength="2">
                        <a class="jia_cart" href="javascript:;" onclick="jiacart(${model.sid},${i})">+</a>
                    </div>
                </li>
                <li class="li_jg">￥${accMul(model.product.price, model.size)}</li>
                <li class="li_zz"><a href="javascript:;" class="deletePro" onclick='deletePro(${model.sid})'>删除</a></li>
            </ul>`
    }

    html += ` <ul class="clearshopcar">
            <li class="li_inp">
                <div class="buy_xuan">全选</div>
            </li>
            <li class="li_sp">&nbsp;</li>
            <li class="li_dj">&nbsp;</li>
            <li class="li_sl">&nbsp;</li>
            <li class="li_jg">&nbsp;</li>
            <li class="li_zz"><a href="javascript:deleteShopCar();">清空购物车</a></li>
        </ul>`
    let productList = document.getElementsByClassName("productList")[0];
    productList.innerHTML = html;




    let buy_xuans = document.getElementsByClassName("buy_xuan")
    let buy_dianhovers = document.getElementsByClassName("buy_dianhover");
    for (let buy_xuan of buy_xuans) {
        buy_xuan.onclick = function (e) {
            // console.log("全选被点击");

            let className = e.target.className;
            if (className.indexOf("buy_xuan_gouxuan") == -1) {
                for (let buy_xuan of buy_xuans) {
                    buy_xuan.className = className + " buy_xuan_gouxuan";
                }
                for (let buy_dianhover of buy_dianhovers) {
                    if (buy_dianhover.className.indexOf("buy_dianhover_gouxuan") == -1) {
                        buy_dianhover.className = buy_dianhover.className + " buy_dianhover_gouxuan";
                    }
                }
            } else {
                for (let buy_xuan of buy_xuans) {
                    buy_xuan.className = className.replace("buy_xuan_gouxuan", "");
                }
                for (let buy_dianhover of buy_dianhovers) {
                    buy_dianhover.className = buy_dianhover.className.replace("buy_dianhover_gouxuan", "");
                }
            }
            totalPriceAndCount();
        };
    }

    for (let buy_dianhover of buy_dianhovers) {
        buy_dianhover.onclick = function (e) {
            if (buy_dianhover.className.indexOf("buy_dianhover_gouxuan") != -1) {
                buy_dianhover.className = buy_dianhover.className.replace("buy_dianhover_gouxuan", "");
                for (let buy_xuan of buy_xuans) {
                    buy_xuan.className = buy_xuan.className.replace("buy_xuan_gouxuan", "");
                }
            } else {
                buy_dianhover.className = buy_dianhover.className + " buy_dianhover_gouxuan";
                let fags = true;
                for (let buy_dianhover of buy_dianhovers) {
                    if (buy_dianhover.className.indexOf("buy_dianhover_gouxuan") == -1) {
                        fags = false;
                    }
                }
                if (fags) {
                    for (let buy_xuan of buy_xuans) {
                        buy_xuan.className = buy_xuan.className + " buy_xuan_gouxuan";
                    }
                } else {
                    for (let buy_xuan of buy_xuans) {
                        buy_xuan.className = buy_xuan.className.replace("buy_xuan_gouxuan", "");
                    }
                }

            }
            totalPriceAndCount();
        }
    }



    totalPriceAndCount();
}

function jiancart(sid, index) {
    // console.log(this,index);
    var jian_carts = document.getElementsByClassName("jian_cart");
    console.log(jian_carts);
    // let inputElem = jian_carts[index].nextElementSibling;
    let inputElem = jian_carts[index].nextElementSibling
    if (inputElem.value == 1) {
        alert("商品最少一个")
        return;
    }
    let size = parseFloat(inputElem.value) - 1;
    ajax_post("/shopcar/updateShopCar", (result) => {
        inputElem.value = size;
        let price = inputElem.parentElement.parentElement.previousElementSibling.children[0].innerHTML.slice(1);
        // console.log();
        inputElem.parentElement.parentElement.nextElementSibling.innerHTML = "￥" + accMul(price, size)
        totalPriceAndCount();
    }, "shopcarId=" + sid + "&" + "size=" + size)

    // console.log(price,size);
    // inputElem.parentElement.parentElement


}


function jiacart(sid, index) {
    // console.log(this, index);
    var jia_carts = document.getElementsByClassName("jia_cart");

    let inputElem = jia_carts[index].previousElementSibling;
    let size = parseFloat(inputElem.value) + 1;
    ajax_post("/shopcar/updateShopCar", result => {
        inputElem.value = size
        let price = inputElem.parentElement.parentElement.previousElementSibling.children[0].innerHTML.slice(1);
        // inputElem.parentElement.parentElement.nextElementSibling.innerHTML = "￥" + price * size*100/100;
        inputElem.parentElement.parentElement.nextElementSibling.innerHTML = "￥" + accMul(price, size)
        totalPriceAndCount();
    }, "shopcarId=" + sid + "&" + "size=" + size)


}

// 乘法
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
topRightInit();  