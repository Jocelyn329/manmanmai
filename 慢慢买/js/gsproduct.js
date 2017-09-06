$(function () {
  var shop = {
    shopid: 0,
    shopname: "",
    flag: false,
  }

  var area = {
    areaid: 0,
    areaname: "",
    flag: false,
  }

  /*页面初始化*/
  getgsproduct(shop.shopid, area.areaid)

  /*创建商店数据*/
  Route.getAjaxData("/api/getgsshop", function (data) {
    $("#shop").html(template("gsShopTpl", data));
    shop.flag = true;
  }, function () {
    if (shop.flag === true) {
      var shopValue = $("#shop").find("li").eq(0).addClass("active").html();
      $("#choose .shopName").html(shopValue);
    }
  })

  /*创建区域数据*/
  Route.getAjaxData("/api/getgsshoparea", function (data) {
    $("#area").html(template("gsAreaTpl", data));
    area.flag = true;
  }, function () {
    if (area.flag === true) {
      var areaValue = $("#area").find("li").eq(0).addClass("active").html().substr(0, 2);
      $("#choose .areaName").html(areaValue);
    }
  })

  /*重点---获取产品数据*/
  function getgsproduct(shopid, areaid) {
    $.ajax({
      url: Route.baseUrl + "/api/getgsproduct?",
      type: "get",
      datatype: "json",
      data: {
        shopid: shopid,
        areaid: areaid
      },
      success: function (data) {
        $("#product").html(template("gsProductTpl", data))
      },
      complete: function () {

      }
    })
  }
  /*三个选择栏的点击事件*/
  $("#choose li").on("click", function () {
    var index = $(this).data("index");
    //箭头切换
    $(this).toggleClass("on").siblings().removeClass("on");

    //下拉菜单 切换显示隐藏
    $("#downlist").children().eq(index).toggleClass("hidden").siblings().addClass("hidden")
  })


  /*shop下拉菜单点击事件*/
  $("#shop").on("click", "li", function () {
    var _this = $(this);
    //当前选中项样式切换
    _this.addClass("active").siblings().removeClass("active");
    //修改shopid值
    shop.shopid = _this.data("shopid");
    //修改选择栏内容 + 箭头切换
    $("#choose .shopli a").html(_this.html()).parent().removeClass("on")
    //下拉菜单 切换显示隐藏
    _this.parent().toggleClass("hidden")
    //获取产品数据
    getgsproduct(shop.shopid, area.areaid);
  })

  /*area下拉菜单点击事件*/
  $("#area").on("click", "li", function () {
    var _this = $(this);
    //当前选中项样式切换
    _this.addClass("active").siblings().removeClass("active");
    //修改shopid值
    area.areaid = _this.data("areaid");
    //修改选择栏内容 + 箭头切换
    $("#choose .areali a").html(_this.html().substr(0, 2)).parent().removeClass("on");
    //下拉菜单 切换显示隐藏
    _this.parent().toggleClass("hidden")
    //获取产品数据
    getgsproduct(shop.shopid, area.areaid);
  })

  /*价格下拉菜单点击事件*/
  $("#price").on("click", "li", function () {
    var _this = $(this);
    //当前选中项样式切换
    _this.addClass("active").siblings().removeClass("active");
    //修改选择栏内容 + 箭头切换
    $("#choose .priceli a").html(_this.html()).parent().removeClass("on")
    //下拉菜单 切换显示隐藏
    _this.parent().toggleClass("hidden")
  })


  /*整合下拉菜单点击事件
   $("#downlist").children().each(function (index, value) {
   $(value).on("click", "li", function () {
   var _this = $(this)
   var index = _this.index();
   console.log(index);
   //商店
   if (index == 0) {
   $("#choose>li").eq(index).find("a").html(_this.html())
   }
   //区域
   else if (index == 1) {
   console.log(_this.html().substr(0, 2));
   $("#choose>li").eq(index).find("a").html()
   }

   })
   })
   */


})