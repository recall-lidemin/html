$(function () {
  //全选全不选
  //获取全选按钮，注册改变事件change(),只要当前input状态发生改变就执行函数
  $(".checkall").change(function () {
    //把当前全选按钮的状态赋给所有子项
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));

    //选中状态加背景
    if ($(this).prop("checked")) {
      $(".cart-item").addClass("check-cart-item");
    } else {
      $(".cart-item").removeClass("check-cart-item");
    }
  });

  //反选
  //子项全部选中时，则全选自动选中
  //由于JQ对象返回的是伪数组，所有当选中的子项的个数等于数组长度jq.length时，就代表子项全部选中了，
  //属性选择器 .j-checkbox:checked
  $(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }

    //判断自身状态，选中则加背景
    if ($(this).prop("checked")) {
      //找到类名为.cart-item的父亲
      //parents([指定父级])与parent()的区别：parents()找所有父级，并且可以指定哪个，parent()找最近的一级父级
      $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item");
    }



  });

  //商品数量增减，点击加号，数量加1，小计自动计算
  //1.substring() 截取字符串
  //2.toFixed() 控制小数位数，没有补零 
  //增加
  $(".increment").on("click", function () {
    //获取文本值
    var num = $(this).siblings(".itxt").val();
    num++;
    $(this).siblings(".itxt").val(num);
    //计算小计
    var price = $(this).parents(".p-num").siblings(".p-price").text();
    price = price.substring(1);
    var sum = num * price;
    sum = sum.toFixed(2);
    //把小计设置回去
    $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
    //重新计算总数和总价
    getSum();
  });

  //减少
  $(".decrement").on("click", function () {
    //获取文本值
    var num = $(this).siblings(".itxt").val();
    num--;
    if (num == 0) {
      alert("必须购买一件");
      return;
    }
    $(this).siblings(".itxt").val(num);

    //计算小计
    var price = $(this).parents(".p-num").siblings(".p-price").text();
    price = price.substring(1);
    var sum = num * price;
    sum = sum.toFixed(2);
    //把小计设置回去
    $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);

    //重新计算总数和总价
    getSum();
  });

  //用户直接修改数量，计算小计
  $(".itxt").on("change", function () {
    //实时获取修改后数据
    var num = $(this).val();
    //校验数据合法性，不合法初始为1
    if (num < 0) {
      alert("商品数量不能为负数！");
      num = 1;
      $(this).val(1);
    }
    //获取单价
    var price = $(this).parents(".p-num").siblings(".p-price").text();
    //截取获取到的单价字符串的数字部分
    price = price.substring(1);
    //小计 = 单价*数量
    var sum = num * price;
    //保留两位小数
    sum = sum.toFixed(2);
    //把小计重新设置到页面
    $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
    //重新计算总数和总价
    getSum();
  });

  //删除
  $(".p-action a").on("click", function () {
    $(this).parents(".cart-item").remove();
    getSum();
  });

  $(".remove-batch").on("click", function () {
    $(".check-cart-item").remove();
    getSum();
  });

  $(".clear-all").on("click", function () {
    $(".cart-item").remove();
    getSum();
  });


  //总计及总额
  //获取所有商品的数量节点，然后遍历从伪数组中把每一个商品的数量拿出来
  getSum();

  function getSum() {
    var res_num = $(".j-checkbox:checked").parents(".cart-item").find(".itxt");
    var res_sum = $(".j-checkbox:checked").parents(".cart-item").find(".p-sum");
    var num = 0;
    var sum = 0;
    //遍历计算总数
    res_num.each(function (index, dom) {
      num += $(dom).val() * 1;
    });
    //设置总数
    $(".amount-sum em").text(num);
    //遍历计算总价
    res_sum.each(function (index, dom) {
      sum += $(dom).text().substring(1) * 1;
    });
    //保留两位小数
    sum = sum.toFixed(2);
    //设置
    $(".price-sum em").text("￥" + sum);
  }

  //结算选中商品
  $(".j-checkbox").on("click", function () {
    var res_num = $(".j-checkbox:checked").parents(".cart-item").find(".itxt");
    var res_sum = $(".j-checkbox:checked").parents(".cart-item").find(".p-sum");

    var num = 0;
    var sum = 0;
    //遍历计算总数
    res_num.each(function (index, dom) {
      num += $(dom).val() * 1;
    });
    //设置总数
    $(".amount-sum em").text(num);
    //遍历计算总价
    res_sum.each(function (index, dom) {
      sum += $(dom).text().substring(1) * 1;
    });
    //保留两位小数
    sum = sum.toFixed(2);
    //设置
    $(".price-sum em").text("￥" + sum);
  });

  //全选结算
  $(".checkall").on("click", function () {
    // var res_num = $(".j-checkbox:checked").parents(".cart-item").find(".itxt");
    // var res_sum = $(".j-checkbox:checked").parents(".cart-item").find(".p-sum");

    var num = 0;
    var sum = 0;
    //遍历计算总数
    $(".itxt").each(function (index, dom) {
      num += $(dom).val() * 1;
    });
    //设置总数
    $(".amount-sum em").text(num);
    //遍历计算总价
    $(".p-sum").each(function (index, dom) {
      sum += $(dom).text().substring(1) * 1;
    });
    //保留两位小数
    sum = sum.toFixed(2);
    //设置
    $(".price-sum em").text("￥" + sum);
  });



















});