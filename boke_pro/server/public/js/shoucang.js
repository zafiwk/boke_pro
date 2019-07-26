function loadData() {
    ajax_post("/blog/getAllCollect", (obj) => {
        // res.send({code:201,msg:"没有登录 跳转到登录页面",url:"/userlogin.html"})
        // console.log(obj["data"]);
        var array = obj["data"];
        var html = "";
        for (let i = 0; i < array.length; i++) {
            var model = array[i];
            html = html + `
        <tr>
            <td><a href="/info.html?bid=${model.bid}" >${model.btitle}</a></td>
            <td><a href="javascript:deleteBid(${model.bid})" >删除</a></td>
        </tr>
        `
        }
        content.innerHTML = html;
    }, null);
}
loadData();

function deleteBid(bid) {
    if (confirm("是否删除该收藏")) {
        var body = "bid=" + bid;
        ajax_post("/blog/deleteCollect", (obj) => {
            if (obj["code"] == 200) {
                alert("删除成功");
                loadData();
            } else {
                alert("服务器异常");
            }
        }, body);
    }
}


topRightInit();