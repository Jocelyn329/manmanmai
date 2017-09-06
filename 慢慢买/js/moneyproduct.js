$(function () {
  var href = window.location.href;
  var productid = href.split("?")[1].split("=")[1]
  getDiscountProduct(productid)

  function getDiscountProduct(productid) {
    $.ajax({
      url: Route.baseUrl + "/api/getmoneyctrlproduct",
      type: "get",
      datatype: "json",
      data: {
        productid: productid
      },
      success: function (data) {
        $("#discount").html(template("discountProductTpl", data))
      }
    })
  }
})
