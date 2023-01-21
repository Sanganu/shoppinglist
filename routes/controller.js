const router = require("express").Router()
const fs = require("fs");
let  db = require("../db/data.json") ;
const { v1: uuidv1 } = require('uuid');

router.get("/",function(request,response){
    fs.readFile("db/data.json","utf8",function(err,data){
        if(err){
            console.log("Error in reading from file",data);
            response.json(err)
        }
        db = JSON.parse(data)
        console.log("Data GET",db)
 
        response.render("index",{list:db})
    })

});

//Sort By Shopname
router.get("/api/shoplist",function(request,response){
    // fs.readFile("db/data.json","utf8",function(err,data){
    //     if(err){
    //         console.log("Error in reading from file",data);
    //         response.json(err)
    //     }
        // db = JSON.parse(data)
        console.log("Original Array: ",db)
        let sortShop = db.sort(function(a,b){
            let shopA = a.shopname.toLowerCase()
            let shopB = b.shopname.toLowerCase()
            if(shopA > shopB){
                return 1
            }
            else if(shopA < shopB){
                return -1
            }
            else {
                return 0
            }
        })
        console.log("Sort Function SORT",sortShop)
       
        response.render("index",{list:sortShop})
    // })

});

router.get("/api/search/:searchString",function(request,response){
    let searchtxt = new RegExp(request.params.searchString,'i');
        console.log("Original Array: ",db)
        let searchitems = db.filter(element => {
          if((searchtxt.test(element.itemdescription)) || (searchtxt.test(element.shopname))){
              return element
          }
        })
        console.log("Search Function SEARCH",searchitems)
        response.json(searchitems)
        // response.render("index",{list:searchitems})
});

router.post("/api/item",function(request,response){
    console.log(request.body,"POST record");
    var record = {
        id: uuidv1(),
        itemdescription: request.body.itemdescription,
        quantity: request.body.quantity,
        shopname: request.body.shopname
    }
    db.push(record);
    fs.writeFile("db/data.json",JSON.stringify(db),function(err,data){
        if(err){
            console.log("Unable to write data to file",err)
            response.json(err)
        }
      
            console.log("Data POST",db)
            response.json(db);
       
    })
});

router.delete("/api/item/:id",function(request,response){
    let  newdb = db.filter(function(item){
         return item.id != request.params.id
    });
    db=newdb;
    console.log("Filtered Array",db);
    fs.writeFile("db/data.json",JSON.stringify(db),function(err,data){
        if(err){
            console.log("Unable to write data to file",err)
            response.json(err)
        }
      
            console.log("Data DELETE",db)
            response.json(db);
        
    })
})

module.exports = router;