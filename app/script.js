$.ajax({
    url: "/api/item",
    method: "GET"
}).then(function (response) {
    console.log("response", response)
}).catch(function (error) {
    console.log("Error ", error)
})

$("#additem").on("click", function () {
    var itementry = {
        itemdescription: $("#itemdescription").val(),
        quantity: $("#quantity").val(),
        shopname: $("#shopname").val()
    }
    console.log(itementry)
    $.post({
        url: "/api/items",
        data: itementry
    }).then(function (response) {
        console.log("Response", response)
    }).catch(function (error) {
        console.log("Error -", error)
    })
})