$(function () {
  var pagecount = 0;
  /*注意从0页开始*/
  var pageid = 0;
  var flag = false;
  //获取分页数据
  getPage(pageid)

  function getPage(pageid) {
    /*将地址栏的中文编码转化为中文 方便面包屑导航的获取*/
    $.ajax({
      url: Route.baseUrl + "/api/getmoneyctrl?",
      type: "get",
      data: {
        pageid: pageid,
      },
      success: function (data) {
        /*创建数据结构*/
        $("#moneyctrl").html(template("moneyctrlTpl", data));

        /*获取总页码  定义模板引擎的参数*/
        pagecount = Math.ceil(data.totalCount / data.pagesize);
        var obj = {
          pageArr: []
        };
        for (var i = 0; i < pagecount; i++) {
          obj.pageArr.push({pageId: i, pageCount: pagecount});
        }
        /*动态创建页码  例如value为0  内容为1/15
         value 对应下标 对应页码*/
        $("#productlist-page select").html(template("pageTpl", obj));
        flag = true;
      },
      complete: function () {
        /*更改下拉菜单的数据*/
        if (flag) {
          var options = $("#productlist-page option");
          options.eq(pageid).attr("selected", true)
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
    if (pageid < 0) {
      pageid = 0;
      alert("已经是第一页");
      return false;
    } else if (pageid > pagecount-1) {
      pageid = pagecount-1;
      alert("已经是最后一页");
      return false;
    }
    getPage(pageid);
  })

  /*select 切换事件*/
  $("#productlist-page select").on("change", function () {
    var _this = $(this);
    pageid = _this.val();
    console.log(pageid);
    getPage(pageid);
  })
})