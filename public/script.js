

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

$(".removeitem").on("click",function(event){
    event.preventDefault()
    var id = $(this).attr("id")
    console.log(id,"delete") 
    $.ajax({
        url: '/api/item/'+id,
        method: "DELETE"
    }).then(function(response){
        console.log(response)
        location.reload()
    }).catch(function(err){
        console.error(err)
    })
})