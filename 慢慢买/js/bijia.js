$(function () {

  var href = decodeURI(window.location.href);
  var productid = href.split("?")[1].split("&")[0].split("=")[1];
  var comment = href.split("?")[1].split("&")[1].split("=")[1];
  var backArr = href.split("?")[1].split("&");
  /*面包屑导航第二个的内容*/
  var bijiaCategory = backArr[3].split("=")[1]
  $("#bijia-nav .bijia-category").html(bijiaCategory + "&gt;")

  /*面包屑导航第二个的链接*/
  var backLink = "productlist.html?";
  for (var i = 2; i < backArr.length; i++) {
    backLink += backArr[i] + "&"
  }
  backLink = backLink.substr(0, backLink.length - 1);
  $("#bijia-nav .bijia-category").attr("href", backLink)

  /*面包屑导航第三个的内容*/
  var infor;

  Route.getAjaxData("/api/getproduct?productid=" + productid, function (data) {
    $("#bijia-product").html(template("bijiaTpl", data));

  }, function (data) {
    /*评论条数*/
    $("#bijia-product .bijia-comment").html(comment);

    /*面包屑导航第三个的内容*/
    infor = $("#bijia-product .bijia-infor p").html().split(" ")[0]
    $("#bijia-nav .bijia-value").html(infor);

  })


  /*获取评论区数据*/
  Route.getAjaxData("/api/getproductcom?productid=" + productid, function (data) {
    $("#comment-content").html(template("bijiaCommentTpl", data))
  }, function () {


    var commentRowArr = $("#comment-content .comment-row");
    /*评论超过一定数量显示隐藏*/
    if (commentRowArr.length > 2) {
      for (var i = 2; i < commentRowArr.length; i++) {
        commentRowArr.eq(i).addClass("hide");
      }
      /*点击查看更多评价*/
      $("#comment-more a").on("click", function () {
        commentRowArr.removeClass("hide");
      })
    }
  })
})
