$.ajax({
    url: "/api/items",
    method: "GET"
}).then(function (response) {
    console.log("response", response)
    let mainObj = $("<table>");
    let list=$("<tbody>")
    for(let i=0;i<response.length;i++){
        let row = $("<tr>")
        let item1 = $("<td>")
        item1.text(`${response[i].itemdescription}`);
        row.attr("data-id",response[i].id);
        row.append(item1);
        let item2 = $("<td>")
        item2.text(`${response[i].shopname}`);
        row.append(item2);
        let item3 = $("<td>")
        item3.text(`${response[i].quantity}`);
        let item4 = $("<td>")
        item4.append(`<button class="deleteitem">Delete</button>`)
        row.append(item4);
        list.append(row)
    }
    mainObj.append(list)
    $("#itemdisplay").append(mainObj)
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
        url: "/api/item",
        data: itementry
    }).then(function (response) {
        console.log("Response", response)
        // location.reload();
    }).catch(function (error) {
        console.log("Error -", error)
    })
})