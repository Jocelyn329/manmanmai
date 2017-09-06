$(function () {

  Route.getAjaxData("/api/getcategorytitle", function (data) {
    /*获取分类标题数据*/
    $("#category-sort>ul").html(template("categoryTitleTpl", data))
  }, function () {

    /*内部数据隐藏 点击展开*/
    $("#category-sort .sort-title").on("click", function () {
      $(this).siblings(".sort-content").toggleClass("hidden");
    })


    /*获取内部具体的数据*/
    $("#category-sort .sort-title").one("click", function () {
      var _this = $(this);
      var titleid = _this.data("titleid");
      /*获取响应的的id*/
      Route.getData("/api/getcategory?titleid=" + titleid, function (data) {
        _this.siblings(".sort-content").html(template("categoryContentTpl", data))
      })
    })


  })
})