

$("#additem").on("submit", function (event) {
    event.preventDefault()
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

$("#searchForm").on("submit",function(event){
    event.preventDefault()
    var searchString = $("#search").val()
    console.log(searchString)
    $.ajax({
        url:`/api/search/${searchString}`,
        method:"GET"
    }).then(function(data){
        $("#search").val("")
        console.log(data)
        $("#itemdisplay").empty()
        let tableElements = data.map(element =>{
            let trEle = $("<tr>")
            let tdEle1 = $("<td>")
            tdEle1.text(element.shopname)
            trEle.append(tdEle1)
            let tdEle2 = $("<td>")
            tdEle2.text(element.itemdescription)
            trEle.append(tdEle2)
            let tdEle3 = $("<td>")
            tdEle3.text(element.quantity)
            trEle.append(tdEle3)
            let tdEle4 = $("<td>")
            let buttonEle = $("<button>")
            buttonEle.addClass("button is-danger is-light removeitem")
            buttonEle.attr("id",element.id)
            buttonEle.text("Remove Item")
            tdEle4.append(buttonEle)
            trEle.append(tdEle4)
            $("#itemdisplay").append(trEle)

        })
    }).catch(function(err){
        console.error("Unable to get search text No record found",err)
    })

})




// $(".removeitem").on("click",function(event){
//     event.preventDefault()
//     var id = $(this).attr("id")
//     console.log(id,"delete") 
//     $.ajax({
//         url: '/api/item/'+id,
//         method: "DELETE"
//     }).then(function(response){
//         console.log(response)
//         location.reload()
//     }).catch(function(err){
//         console.error(err)
//     })
// })