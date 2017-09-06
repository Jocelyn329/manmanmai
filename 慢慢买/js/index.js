$(function () {
  //获取首页菜单栏api
  Route.getIndexMenu('/api/getindexmenu', function (data) {
    $("#indexMenu").html(template("indexMenuTpl", data))
  });


  //获取首页的折扣列表中的数据api
  Route.getData('/api/getmoneyctrl', function (data) {
    console.log(data);
    $("#moneyctrl").html(template("indexMoneyCtrlTpl", data))
  });
})