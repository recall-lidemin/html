$(function () {
  $(window).scroll(function () {
    //当滚轮到一定位置时，显示左侧导航栏
    if ($(document).scrollTop() > $(".recommend").offset().top) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }

    //滑动导航栏跟着走
    $(".floor .w").each(function (index, dom) {
      if ($(document).scrollTop() >= $(dom).offset().top) {
        $(".fixedtool li").eq(index).addClass("current")
          .siblings().removeClass("current");
      }
    });

  });
  //点击导航栏跳转对应的栏目
  $(".fixedtool li").on("click", function () {
    $(this).addClass("current");
    $(this).siblings().removeClass("current");
    var index = $(this).index();
    var top = $(".floor .w").eq(index).offset().top;
    $("html,body").animate({
      scrollTop: top
    });


  });

});