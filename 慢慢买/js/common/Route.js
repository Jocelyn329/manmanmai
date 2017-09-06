(function (window) {
  var Route = {
    /* 提出 URL 以备 提取接口 可以集中管理 */
    baseUrl: 'http://127.0.0.1:9090',
    /* ------ 首页数据请求 ------ */
    getData: m_getData,
    getAjaxData: m_getAjaxData,
    getIndexMenu: m_getIndexMenu,
    getPage: m_getData

  }

  /**
   * 公共get方法获取页面上的数据
   * @param currentUrl: 当前页面地址
   * @param callback: get请求的回调函数
   */
  function m_getData(currentUrl, callback) {
    var url = Route.baseUrl + currentUrl;
    $.get(url, function (data) {
      callback && callback(data);
    }, 'json');
  }

  function m_getAjaxData(currentUrl, successCall, completeCall) {
    var url = Route.baseUrl + currentUrl;
    $.ajax({
      url: url,
      datatype: "json",
      type: "get",
      success: function (data) {
        successCall && successCall(data)
      },
      complete: function (data) {
        completeCall && completeCall(data);
      }
    })
  }



  /**
   * 获取首页导航菜单
   * @param currentUrl
   * @param callback
   */
  function m_getIndexMenu(currentUrl, callback) {
    var url = Route.baseUrl + currentUrl;
    $.ajax({
      url: url,
      dataType: "json",
      type: "get",
      success: function (data) {
        callback && callback(data);
      },
      //注意在完成后获取页面元素
      complete: function (data) {
        var menuHidden = $("#indexMenu").find("li:nth-last-child(-n+4)");
        menuHidden.addClass("hidden")
        $("#indexMenu").find("li:eq(7)").on("click", function () {
          menuHidden.toggleClass("hidden")
        })
      }
    })
  }


  window.Route = Route;
  /* 向外暴露 Route */


})(window);