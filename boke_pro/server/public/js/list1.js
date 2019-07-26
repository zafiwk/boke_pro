getclickTop4();
loadEcommendBlogsData();

getTopBoke(newBlog_top)
getblogData(9)
var pageTotal = 0;
ajax_get("/blog/getCount", (result) => {
    var count = parseInt(result["data"][0]["count(bid)"]);
    if (isNaN(count)) {
        return;
    }
    var pageSize = Math.floor((count - 1) / 9 + 1);
    pageTotal = pageSize;
    console.log("查询分页数据时候 pageSize" + pageSize + "总数据" + count);
    // <a href="#" class="prev"> 上一页</a>
    //     <a href="#">1</a>
    //     <a href="#" class="active">2</a>
    //     <a href="#">3</a>
    //     <a href="#">4</a>
    //     <a href="#">5</a>
    //     <a href="#" class="next">下一页</a>
    var html = ""
    html += html + `<a href="#" class="prev"> 上一页</a>`
    for (let i = 0; i < pageSize; i++) {
        html += `<a href="javascript:pageClick('${i + 1}')">${i + 1}</a>`
        if (i > 5) {
            html += `<a href="#">...</a>`
            break;
        }
    }
    html += ` <a href="javascript:pageClick('2');" class="next">下一页</a>`;
    page.innerHTML = html;
})

function pageClick(n) {
    console.log("分页a标签被点击");
    var currentPage = parseInt(n) - 1;
    var html = "";
    if (currentPage > 0) {
        html += `<a href="javascript:pageClick('${currentPage}')" class="prev"> 上一页</a>`
    } else {
        html += `<a href="javascript:;" class="prev"> 上一页</a>`;
    }

    for (let i = 0; i < pageTotal; i++) {
        if (currentPage == i) {
            html += `<a href="javascript:pageClick('${i + 1}')" class="active">${i + 1}</a>`
        } else {
            html += `<a href="javascript:pageClick('${i + 1}')">${i + 1}</a>`
        }
        if (i > 5) {
            html += `<a href="javascript:;">...</a>`
            break;
        }
    }

    if (currentPage + 2 > pageTotal) {
        html += ` <a href="javascript:;" class="next">下一页</a>`;
    } else {
        html += ` <a href="javascript:pageClick('${currentPage + 2}')" class="next">下一页</a>`;
    }
    page.innerHTML = html;


    var url = "/blog/getblog?count=9&start=" + currentPage * 9;
    console.log(`============================当前起始下标数据${currentPage * 9}`);


    ajax_get(url, (obj) => {
        var dataArray = obj["data"];
        // var liArray = document.getElementsByClassName("common");
        // console.log(liArray);
        // let  documentFragment=document.createDocumentFragment;
        let lis = document.querySelectorAll("#newBolo_list1 > li")
        for (let i = 1; i < lis.length; i++) {
            let node = lis[i];
            node.parentNode.removeChild(node);
        }
        let newBolo_list = document.getElementById("newBolo_list1");
        html = newBolo_list.innerHTML;
        for (let i = 0; i < dataArray.length; i++) {
            var model = dataArray[i];
            // var li = liArray[i];

            var imgs = parseImgUrlByContent(model.bcontent);

            var subContent = "";
            var content = deleteHTMLStr(model.bcontent);
            if (content.length > 100) {
                subContent = content.substr(0, 100) + "...";
            } else {
                subContent = content;
            }
            var label = getLableByNunber(model.labelId)
            var date = new Date(model.btiem);

            var label = getLableByNunber(model.labelId)

            html += `
            <li class="common">
         <h3>${model.btitle}</h3>
            <img src="${imgs[0]}">
            <p>${subContent}
            </p>
            <div class="footer">
                <img src="1.jpg" /><span>王康 ${date.toLocaleDateString()}</span><span>【<a href="#">${label}</a>】</span>
            </div>
            <a href="/info.html?bid=${model.bid}">阅读更多</a>
            </li>
    `
        }

        newBolo_list.innerHTML = html;
    });
}
topRightInit();