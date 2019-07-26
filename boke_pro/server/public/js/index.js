//精彩专题

function sortByTimeContent_loaddata(typeId) {
    ajax_get("/blog/queryByTypeId?typeId=" + typeId, (result) => {
        // console.log(result);
        var dataArray = result["data"];
        var html = "";
        for (let i = 0; i < dataArray.length; i++) {
            let model = dataArray[i];
            var imgs = parseImgUrlByContent(model.bcontent);
            var subContent = "";
            var content = deleteHTMLStr(model.bcontent);
            // console.log("处理html元素后的值:" + content);
            if (content.length > 38) {
                subContent = content.substr(0, 38) + "...";
            } else {
                subContent = content;
            }
            html = html + `
            <li class="blogCotent-li">
                <img src="${imgs[0]}">
                <p class="title">${model.btitle}</p>
                <p class="desc">${subContent}</p>
                <a href="/info.html?bid=${model.bid}">+阅读文章</a>
             </li>
            `
        }
        sortByTimeContent.innerHTML = html
    });
}

sortByTimeContent_loaddata(1);




getclickTop4();

loadEcommendBlogsData();

getTopBoke(newBlog_top)
getblogData(2)

// <img src="1.jpg" class="banner_left"  id="banner_left">
// <img src="2.jpg" class="banner_center" id="banner_center">
// <img src="3.jpg" class="banner_right" id="banner_right">

var nodeArray = [banner_start, banner_left, banner_center, banner_right]
function bannerTime() {
    setTimeout(() => {
        console.log("定时器开始调用");
        nodeArray[0].className = "banner_start_to_left";
        nodeArray[1].className = "banner_left_to_center";
        nodeArray[2].className = "banner_center_to_right";
        nodeArray[3].className = "banner_right_to_hide";
        setTimeout(() => {
            nodeArray[3].className = "banner_start";
            var length = nodeArray.length;
            var node = nodeArray[0];
            for (let i = 1; i < length; i++) {
                let tNodel = nodeArray[i];
                nodeArray[i] = node;
                node = tNodel;
            }
            nodeArray[0] = node;
        }, 2000);
        bannerTime();
    }, 5000)
}

bannerTime();
topRightInit();