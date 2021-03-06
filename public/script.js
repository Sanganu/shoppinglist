function getAllRecords(){
    $.ajax({
        url: "/api/items",
        method: "GET"
    }).then(function (response) {
        console.log("response", response)
        let mainObj = $("<table>");
        mainObj.append(`<thead>
        <tr>
        <th>Item</th>
        <th>Shop</th>
        <th>Quantity</th>
        <th></th>
        </tr>
        </thead>`)
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
            row.append(item3);
            let item4 = $("<td>")
            item4.append(`<button class="deleteitem">Delete</button>`)
            row.append(item4);
            list.append(row)
        }
        mainObj.append(list)
        $("#itemdisplay").html(mainObj)
    }).catch(function (error) {
        console.log("Error ", error)
    })
    
}

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
       // getAllRecords();
        $("#itemdescription").val("");
        $("#quantity").val("");
        $("#shopname").val("");
        location.reload();
    }).catch(function (error) {
        console.log("Error -", error)
    })
})

$("#itemdisplay").on("click",".removeitem",function(){
    const id = $(this).attr("id")
    console.log("Delete",id);

    $.ajax({
        url: "/api/item/"+id,
        method:"DELETE"
    }).then(function(yesdeleted){
        console.log("Item deleted",yesdeleted);
        // getAllRecords();
        location.reload();
    }).catch(function(err){
        console.log("Unable to delete",err)
    })
});


$("#searchitem").on("click",function(){
    let searchtext = $(this).sibling().val()
    console.log("search",searchtext)
    $.ajax({
        url:"/api/search/"+searchtext,
        method:"GET",
    }).then(function(response){
        console.log("REs",res)
    }).catch(function(err){
        console.log("Unable to get searchtxt",err)
    })
})

// getAllRecords();

// $(".removeitem").on("click",function(){
    
// })