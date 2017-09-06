/**
 * Created by LENOVO on 2017/8/31.
 */
$(function () {
  var titleid = 0;

  Route.getData("/api/getbaicaijiatitle", function (data) {
    $("#lis-wrapper").html(template("bctitleTpl", data));

    /*初始化类 加底边*/
    $("#lis-wrapper li").eq(0).addClass("active");

    /*ul宽度设置*/
    var width = 0;
    $("#lis-wrapper li").each(function () {
      width += Math.ceil($(this).outerWidth(true));
    })
    $("#lis-wrapper").css("width", Math.ceil(width / 20) + "rem");
    // $("#lis-wrapper").width(width);注意width设置宽度单位是px

    /*调用插件*/
    var myScroll = new IScroll("#wrapper", {scrollX: true});

    /*渲染产品数据*/
    titleid = $("#lis-wrapper li").eq(0).data("titleid");
    getProduct(titleid)
  })

  /*获取产品数据*/
  function getProduct(titleid) {
    var url = Route.baseUrl + "/api/getbaicaijiaproduct"
    $.get(url, {titleid: titleid}, function (data) {
      $("#baicaijia-product").html(template("bccontentTpl", data))
    })
  }

  /*标题点击事件*/
  $("#lis-wrapper").on("click", "li", function () {
    titleid = $(this).data("titleid");

    /*发送请求*/
    getProduct(titleid);

    /*标题栏选中样式切换*/
    $(this).addClass("active").siblings("li").removeClass("active")

    /*标题栏动画*/
    // var ulLeft = $(this).position().left;
    // $(this).parent().css({transform: "translateX(" + -ulLeft + "px)"})
    // console.log($(this).parent());
  })

})