// 关闭广告
var close = document.getElementById("close");
close.onclick = function () {
    document.getElementById("promo").style.display = "none";
};
// 鼠标经过显示
var my = document.getElementById("my");
my.onmouseover = function () {
    document.getElementById("ul").style.display = "block";
}
my.onmouseout = function () {
    document.getElementById("ul").style.display = "none";
}

var my = document.getElementById("kefu");
my.onmouseover = function () {
    document.getElementById("kefu_list").style.display = "block";
}
my.onmouseout = function () {
    document.getElementById("kefu_list").style.display = "none";
}

var my = document.getElementById("code");
my.onmouseover = function () {
    document.getElementById("erweima").style.display = "block";
}
my.onmouseout = function () {
    document.getElementById("erweima").style.display = "none";
}
// 二级列表显示
var home = document.getElementById("home");
home.onmouseover = function () {
    document.getElementById("tv_list").style.display = "block";
}
home.onmouseout = function () {
    document.getElementById("tv_list").style.display = "none";
}


// tab
var li = document.querySelectorAll(".right_nav ul li");
for (var i = 0; i < li.length; i++) {
    li[i].onclick = function () {
        for (var j = 0; j < li.length; j++) {
            li[j].classList.remove("current");
        }
        this.classList.add("current");
    }
}