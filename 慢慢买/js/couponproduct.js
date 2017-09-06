$(function () {
  var url = decodeURI(window.location.href).split("?")[1];
  var title = url.split("&")[0].split("=")[1];
  var couponid = url.split("&")[1].split("=")[1];
  var flag = false;

  /*头部标题设置*/
  $("#header h1").html(title + "优惠券")


  /*创建优惠券列表*/
  function getList(couponid) {

    $.ajax({
      type: "get",
      url: Route.baseUrl + '/api/getcouponproduct?',
      datatype: "json",
      data: {
        couponid: couponid
      },
      success: function (data) {
        $("#list-content").html(template("listsTpl", data));
        flag = true;
      },
      complete: function () {
      }
    })
  }


  /*列表点击事件*/
  $("#list-content").on("click", ".list-product", function () {
    var _this = $(this);
    index = $(this).index();
    /*获取li中图片的src属性对模态层中图片进行赋值*/
    var imgSrc = _this.find("img").attr("src");
    $("#modal .current").attr("src", imgSrc).parents("#modal").fadeIn();
    $("body").addClass("ovf-hidden");
  })

  var index = 0
  /*模态层点击事件*/
  $("#modal").on("click", function () {
    $(this).fadeOut();
    $("body").removeClass("ovf-hidden")
  })


  /*左右箭头点击事件*/
  $("#modal .left").on("click", function (e) {
    e.stopPropagation()
    $(".list-pic img").eq(index).fadeOut();
    index--
    if (index < 0) {
      index = $(".list-pic img").length - 1;
    }
    var src = $(".list-pic img").eq(index).attr("src");
    $("#modal img").attr("src", src).fadeIn()
  })


  /*左右箭头点击事件*/
  $("#modal .right").on("click", function (e) {
    e.stopPropagation()
    $(".list-pic img").eq(index).fadeOut();
    index++
    if (index > $(".list-pic img").length - 1) {
      index = 0;
    }
    var src = $(".list-pic img").eq(index).attr("src");
    $("#modal img").attr("src", src).fadeIn()
  })
  getList(couponid);
})
