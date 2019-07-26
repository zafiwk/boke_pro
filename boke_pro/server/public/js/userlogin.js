
isallow = false;

function testUname() {
    if (uname.value) {

        var reg = /^\w{4,10}$/
        if (reg.test(uname.value)) {
            isallow = true;
            luname.innerHTML = "";
        } else {
            isallow = false;
            luname.innerHTML = "用户名4-10位之间,字母或者数字组成";
        }
    } else {
        isallow = false;
        luname.innerHTML = "用户名为空";
    }
}


function testPwd() {
    if (pwd.value) {

        var reg = /^\w{6,10}$/
        if (reg.test(pwd.value)) {
            isallow = true;
            lpwd.innerHTML = "";
        } else {
            isallow = false;
            lpwd.innerHTML = "密码6-10位之间,字母或数字组成";
        }

    } else {
        isallow = false;
        lpwd.innerHTML = "密码为空";
    }
}

function userLogin() {
    if (!isallow) {
        return
    }
    var body = "uname=" + uname.value + "&pwd=" + pwd.value;
    ajax_post("/admin/userLogin", (obj) => {
        // console.log("用户等返回的json");
        // console.log(obj)
        // alert("登录成功")
        window.location.href = "/";
    }, body)
}
topRightInit();