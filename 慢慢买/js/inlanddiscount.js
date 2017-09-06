$(function () {

    Route.getData("/api/getinlanddiscount", function (data) {
      console.log(data);
      $("#discount-list").html(template("discountListTpl",data))
    })

})