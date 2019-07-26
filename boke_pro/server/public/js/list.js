function sortByTimeContent_loaddata(typeId,elememtId) {
    var url="/blog/queryByTypeId?typeId=" + typeId;
    ajax_get(url, (result) => { 
        var dataArray = result["data"];
        var modelArray=[]
        for (let i = 0; i < dataArray.length; i++) {
            let model = dataArray[i];
            var imgs = parseImgUrlByContent(model.bcontent);
            var subContent = "";
            var content = deleteHTMLStr(model.bcontent);
            if (content.length >50) {
                subContent = content.substr(0, 38) + "...";
            } else {
                subContent = content;
            }
            model.imgs=imgs;
            model.content=subContent;
            modelArray.push(model);
        }

        var html = `
        <li class="blogCotent-li">
                <div class="left_list_line">
                        <img src="${modelArray[0].imgs[0]}">
                        <p class="title">${modelArray[0].btitle}</p>
                        <p class="desc">${modelArray[0].content}</p>
                        <a href="/info.html?bid=${modelArray[0].bid}">+阅读文章</a>
                </div>
            </li>
            <li class="blogCotent-li">
                <div class="left_list_line">
                        <img src="${modelArray[1].imgs[0]}">
                        <p class="title">${modelArray[1].btitle}</p>
                        <p class="desc">${modelArray[1].content}</p>
                        <a href="/info.html?bid=${modelArray[1].bid}">+阅读文章</a>
                </div>
            </li>
            <li class="blogCotent-li">
                <div>
                        <img src="${modelArray[2].imgs[0]}">
                        <p class="title">${modelArray[2].btitle}</p>
                        <p class="desc">${modelArray[2].content}</p>
                        <a href="/info.html?bid=${modelArray[2].bid}">+阅读文章</a>
                </div>
            </li>
            <li class="blogCotent-li">
                <div class="top-list-line left_list_line">
                        <img src="${modelArray[3].imgs[0]}">
                        <p class="title">${modelArray[3].btitle}</p>
                        <p class="desc">${modelArray[3].content}</p>
                        <a href="/info.html?bid=${modelArray[3].bid}">+阅读文章</a>
                </div>
            </li>
            <li class="blogCotent-li">
                <div class="top-list-line left_list_line">
                        <img src="${modelArray[4].imgs[0]}">
                        <p class="title">${modelArray[4].btitle}</p>
                        <p class="desc">${modelArray[4].content}</p>
                        <a href="/info.html?bid=${modelArray[4].bid}">+阅读文章</a>
                </div>
            </li>
            <li class="blogCotent-li">
                <div class="top-list-line">
                        <img src="${modelArray[5].imgs[0]}">
                        <p class="title">${modelArray[5].btitle}</p>
                        <p class="desc">${modelArray[5].content}</p>
                        <a href="/info.html?bid=${modelArray[5].bid}">+阅读文章</a>
                </div>
            </li>
        `;
        // for (let i = 0; i < dataArray.length; i++) {
        //     let model = dataArray[i];
        //     var imgs = parseImgUrlByContent(model.bcontent);
        //     var subContent = "";
        //     var content = deleteHTMLStr(model.bcontent);
        //     // console.log("处理html元素后的值:" + content);
        //     if (content.length >50) {
        //         subContent = content.substr(0, 38) + "...";
        //     } else {
        //         subContent = content;
        //     }
        //     html = html + `
        // <li class="blogCotent-li">
        //     <div>
        //         <img src="${imgs[0]}">
        //         <p class="title">${model.btitle}</p>
        //         <p class="desc">${subContent}</p>
        //         <a href="/info.html?bid=${model.bid}">+阅读文章</a>
        //     </div>
        // </li>
        // `
        // return html;
        elememtId.innerHTML=html;
    });
}
sortByTimeContent_loaddata(1, sortByTimeContent_list1);
sortByTimeContent_loaddata(2, sortByTimeContent_list2);
sortByTimeContent_loaddata(3, sortByTimeContent_list3);
sortByTimeContent_loaddata(4, sortByTimeContent_list4);

getclickTop4();
loadEcommendBlogsData();
topRightInit();