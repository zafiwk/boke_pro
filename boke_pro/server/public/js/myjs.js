function ajax_get(url,backCall){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange =function(){
        if(xhr.readyState==4&&xhr.status==200){
           var obj = JSON.parse(xhr.responseText);
           backCall(obj);
        }
    }
    xhr.open("GET",url,true);
    xhr.send();
}
function ajax_post(url,backCall,bodydata){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange =function(){
        if(xhr.readyState==4&&xhr.status==200){
           var obj = JSON.parse(xhr.responseText);
           backCall(obj);
        }
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-ulrencoded")
    xhr.open("POST",url,true);
    xhr.send(bodydata);
}

function parseImgUrlByContent(content){
    var reg = /src=\"+[0-9a-z./]*\"+/gi;
    var imgeArray=[];
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

function deleteHTMLStr(content){
    content=content.replace(/&nbsp;/gi,"");
    content=content.replace(/<\/?.+?\/?>/gi,"");   
    return content;
}