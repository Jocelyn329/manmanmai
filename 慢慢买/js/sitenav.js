$(function () {
  Route.getData("/api/getsitenav", function (data) {
    $("#sitenav-list").html(template("sitenavTpl",data))
  })
})
