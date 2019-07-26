var isNotLogin = false;
function register() {
    if (!isNotLogin) {
        return;
    }
    var body = "uname=" + uname.value + "&pwd=" + pwd.value;
    ajax_post("/admin/register", (obj) => {
        // console.log(obj)
        alert("注册成功")
        window.location.href = "/";
    }, body)
}


function testPwd() {
    if (!pwd.value) {
        isNotLogin = false;
        lpwd.innerHTML = "密码不能为空";
    } else {
        var reg = /^\w{4,10}$/
        if (reg.test(pwd.value)) {
            isNotLogin = true;
            lpwd.innerHTML = "";
        } else {
            isNotLogin = false;
            lpwd.innerHTML = "密码6-10位之间,字母或数字组成";
        }
    }
}
function testUname() {
    if (!uname.value) {
        isNotLogin = false;
        luname.innerHTML = "用户名为空";
        return
    } else {
        var reg = /^\w{4,10}$/
        if (reg.test(uname.value)) {
            isNotLogin = true;
            luname.innerHTML = "";
        } else {
            isNotLogin = false;
            luname.innerHTML = "用户名4-10位之间,字母或者数字组成";
            return;
        }
    }
    var body = "uname=" + uname.value;
    ajax_post("/admin/userIsExists", (obj) => {
        if (obj["msg"] === "用户存在") {
            isNotLogin = false;
            luname.innerHTML = "用户已近存在";
        } else {
            isNotLogin = true;
            luname.innerHTML = ""
        }
    }, body);
}
topRightInit();