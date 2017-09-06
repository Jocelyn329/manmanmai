$(function () {
  Route.getData("/api/getbrandtitle", function (data) {

    $("#brand-all").html(template("brandTitleTpl", data));
  })
})
