$(function () {
  var href = window.location.href

  /*将地址栏的中文编码转化为中文 方便面包屑导航的获取*/
  var href = decodeURI(href.split("?")[1])

  /* 获取分类的id*/
  var categoryid = href.split("=")[1].split("&")[0];
  var category = href.split("=")[2].split("&")[0];
  var pageid = 1

  var pagecount = 0;
  var flag = false;

  /*面包屑导航内容*/
  $("#product-nav").find(".nav-value").html(category);

  getPage(categoryid, category, pageid);
  //获取分页数据
  function getPage(categoryid, category, pageid) {
    /*将地址栏的中文编码转化为中文 方便面包屑导航的获取*/

    $.ajax({
      url: Route.baseUrl + "/api/getproductlist?",
      type: "get",
      data: {
        categoryid: categoryid,
        category: category,
        pageid: pageid,
      },
      success: function (data) {
        $("#productlist-infor").html(template("productlistTpl", data));

        /*获取总页码  定义模板引擎的参数*/
        pagecount = Math.ceil(data.totalCount / data.pagesize);
        var obj = {
          pageArr: []
        };
        for (var i = 1; i <= pagecount; i++) {
          obj.pageArr.push({pageId: i, pageCount: pagecount});
        }
        /*动态创建页码*/
        $("#productlist-page select").html(template("pageTpl", obj));

        /*跳转链接地址栏设置*/
        var href = "categoryid=" + categoryid + "&category=" + category + "&pageid=" + pageid;
        var links = $("#productlist-infor>li>a")
        links.attr("href", links.attr("href") + href);
        flag = true;
      },
      complete: function () {
        if (flag) {
          var options = $("#productlist-page option");
          options.eq(pageid - 1).attr("selected", true)
        }
        flag = false;
      }
    })
  }

  /*上下页点击事件*/
  $("#productlist-page input").on("click", function () {

    var _this = $(this)
    var index = _this.data("index");
    /*页码更新*/
    if (index == "prev") {
      pageid--
    }
    if (index == "next") {
      pageid++;
    }
    /*极值判断*/
    if (pageid < 1) {
      pageid = 1;
      alert("已经是第一页");
      return false;
    } else if (pageid > pagecount) {
      pageid = pagecount;
      alert("已经是最后一页");
      return false;
    }
    getPage(categoryid, category, pageid);
  })

  /*select 切换事件*/
  $("#productlist-page select").on("change", function () {
    var _this = $(this);
    pageid = _this.val()
    getPage(categoryid, category, pageid);
  })

//    Route.getAjaxData("/api/getproductlist?" + href, function (data) {
//    /*创建productlist列表*/
//   $("#productlist-infor").html(template("productlistTpl", data))
//
//   /*获取总页码  定义模板引擎的参数*/
//   pagecount = Math.ceil(data.totalCount / data.pagesize);
//   for (var i = 1; i <= pagecount; i++) {
//     obj.pageArr.push({pageId: i, pageCount: pagecount})
//   }
// }, function () {
//
//   /*跳转链接地址栏设置*/
//   var links = $("#productlist-infor>li>a")
//   links.attr("href", links.attr("href") + href)
//
//   /*动态创建页码*/
//   $("#productlist-page select").html(template("pageTpl", obj));
//   var options = $("#productlist-page select").find("option");
//
//
//   /*上下页点击事件*/
//   $("#productlist-page input").on("click", function () {
//
//     var _this = $(this)
//     var index = _this.data("index");
//     if (index == "prev") {
//       pageid--
//     }
//     if (index == "next") {
//       pageid++;
//     }
//     /*极值判断*/
//     if (pageid < 1) {
//       pageid = 1;
//       alert("已经是第一页")
//     } else if (pageid > pagecount) {
//       pageid = pagecount;
//       alert("已经是最后一页")
//     }
//     optionSel();
//   })
//
//   /*select 切换事件*/
//   $("#productlist-page select").on("change", function () {
//     // console.log($("#productlist-page select option:selected"));;
//     // optionSel()
//   })
//
//   /**/
//   function optionSel() {
//     options.each(function (index, value) {
//       var _this = $(this);
//       if (pageid == _this.val()) {
//         window.location.href = "productlist.html?categoryid=" + categoryid + "&category=" + category + "&pageid=" + pageid;
//         _this.attr("selected", true).siblings().attr("selected", false)
//       }
//
//       console.log(options);
//     })
//   }
//
// })

})