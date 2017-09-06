$(function () {
  var url = decodeURI(window.location.href).split("?")[1];

  var title = url.split("&")[0].split("=")[1].replace("十大品牌", "");
  var categoryid = url.split("&")[1].split("=")[1];
  var brandtitleid = url.split("&")[2].split("=")[1];
  // var flag = {
  //   title: false,
  //   product: false
  // };
  var pagesize = 4;
  var obj = {};


  /*面包屑导航内容修改*/
  $("#brand-nav .current").html(title);

  /*标题内容修改*/
  $("#brand h3").html(title + "哪个牌子好");
  $("#productlist h3").html(title + "产品销售排行")
  $("#newest h3").html(title + "最新评论")

  /*哪个牌子好数据请求*/
  $.ajax({
    url: Route.baseUrl + "/api/getbrand?",
    type: "get",
    datatype: "json",
    data: {
      brandtitleid: brandtitleid
    },
    success: function (data) {
      $("#brand-all").html(template("brandTpl", data));
      $("#brand-all .num").each(function (index, value) {
        var _this = $(value);
        _this.html(index + 1);
      })
    }
  })


  /*产品销售排行数据请求*/
  $.ajax({
    url: Route.baseUrl + "/api/getbrandproductlist?",
    datetype: "json",
    type: "get",
    data: {
      brandtitleid: brandtitleid,
      pagesize: pagesize
    },
    success: function (data) {
      $("#productlist-all").html(template("productlistTpl", data));
      /*获取第一个产品信息  为了最新评论引用*/
      var firstLi = $("#productlist-all>li").eq(0);
      obj.productid = firstLi.data("productid")
      obj.src = firstLi.find(".left").children("img").eq(0).attr("src");
      obj.name = firstLi.find(".right").children(".name").eq(0).html();
      getProductcom(obj)
    }
  })
})

function getProductcom(obj) {
  $.ajax({
    url: Route.baseUrl + "/api/getproductcom?",
    datetype: "json",
    type: "get",
    data: {
      productid: obj.productid
    },
    success: function (data) {
      $("#newest-all").html(template("productcomTpl", data));
      /*第一个*/
      $("#newest-all .left img").attr("src", obj.src)
      $("#newest-all .right .name").html(obj.name);
    }
  })
}
