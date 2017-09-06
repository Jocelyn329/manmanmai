$(function () {
  Route.getData("/api/getcoupon", function (data) {
    console.log(data);
    $("#onsale-content").html(template("onsaleTpl", data))
  })
})
