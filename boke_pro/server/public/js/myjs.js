function ajax_get(url, backCall) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log("返回的数据:"+xhr.responseText)
            var obj = JSON.parse(xhr.responseText);
            if (obj["code"] == 300) {
                var msg = obj["msg"] + ",请刷新页面"
                alert(msg)
                return
            }
            backCall(obj);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}
function ajax_post(url, backCall, bodydata) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log("返回的数据:"+xhr.responseText)
            var obj = JSON.parse(xhr.responseText);
            if (obj["code"] == 300) {
                var msg = obj["msg"] + ",请刷新页面"
                alert(msg)
                return
            }
            backCall(obj);
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    console.log("post请求发送的数据" + bodydata);
    xhr.send(bodydata);
}

function parseImgUrlByContent(content) {
    var reg = /src=\"+[0-9a-z./]*\"+/gi;
    var imgeArray = [];
    do {
        var regObject = reg.exec(content);
        if (regObject != null) {
            str = regObject[0];
            var imgeUrl = str.split("\"")[1];
            imgeArray.push(imgeUrl);
        } else {
            return imgeArray;
            break;
        }
    } while (true)

}

function deleteHTMLStr(content) {
    content = content.replace(/&nbsp;/gi, "");
    content = content.replace(/<\/?.+?\/?>/gi, "");
    return content;
}


{/* <option value="1">笔记心得</option>
<option value="2">vue笔记</option>
<option value="3">心灵感悟</option>
<option value="4">web前沿</option> */}
function getLableByNunber(lableId) {
    var label = "";
    switch (parseInt(lableId)) {
        case 1:
            label = "笔记心得";
            break;
        case 2:
            label = "vue笔记";
            break;
        case 3:
            label = "心灵感悟";
            break;
        case 4:
            label = "web前沿";
            break;
    }
    return label;
}


function  getTopBoke(element){
    ajax_get("http://localhost:8080/blog/getTopBoke",(obj)=>{
        var model =obj["data"][0];
        var imgs = parseImgUrlByContent(model.bcontent);
        console.log("解析出来了图片张数"+imgs.length)
        if(imgs.length==1){
            imgs.push(imgs[0]);
            imgs.push(imgs[0]);
            imgs.push(imgs[0]);
            imgs.push(imgs[0]);
        }
        if(imgs.length==2){
            imgs.push(imgs[1]);
            imgs.push(imgs[1]);
        }
        if(imgs.length==3){
            imgs.push(imgs[2]);
        }
        var subContent = "";
        var content = deleteHTMLStr(model.bcontent);
        // console.log("处理html元素后的值:" + content);
        if (content.length > 200) {
                subContent = content.substr(0, 200) + "...";
        } else {
                subContent = content;
        }
        var label =getLableByNunber(model.labelId)
        var date= new Date(model.btiem);
        var html =`
        <a  href="/info.html?bid=${model.bid}"><p><span>【顶】</span>${model.btitle}</p></a>
                    <ul>
                        <li><img src="${imgs[0]}"></li>
                        <li><img src="${imgs[1]}"></li>
                        <li><img src="${imgs[2]}"></li>
                        <li><img src="${imgs[3]}"></li>
                    </ul>
                    <P>${subContent}</P>
                    <div class="footer">
                        <img src="1.jpg" /><span>王康 ${date.toLocaleDateString()}</span><span>【<a href="#">${label}</a>】</span>
                    </div>
        `
        element.innerHTML=html;
    });
}



function getclickTop4(){
    ajax_get("/blog/getClickTop4",(obj)=>{
        var dataArray=obj["data"];
        var html ="";
        for(let i=0;i<dataArray.length;i++){
            var model=dataArray[i];
            var titlt = ""
            if(model.btitle.length>13){
                titlt=model.btitle.substr(0,13)+"...";
            }else{
                titlt=model.btitle;
            }
            html=html +`
            <li>
            <a href="/info.html?bid=${model.bid}">${titlt}</a>
            </li>
            `
        }
        clicklist_ul.innerHTML = html;
    });

}



function loadEcommendBlogsData(){
    ajax_get("/blog/commenblog",(obj)=>{
        var dataArray=obj["data"];
        var html = "";
        for(let i=0;i<dataArray.length;i++){
            var model =dataArray[i];
            var title="";
            var imgs=parseImgUrlByContent(model.bcontent);
            if(model.btitle.length>18){
                title=model.btitle.substr(0,18)+"...";
            }else{
                title=model.btitle;
            }
            html = html +`
            <li>
                <img src="${imgs[0]}">
                <p><a href="/info.html?bid=${model.bid}">${title}</a></p>
            </li>
            `
        }
        ecommend_blogs_ul.innerHTML =html;
    });
   
}
