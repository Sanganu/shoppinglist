const router = require("express").Router()
const fs = require("fs");
let  db = require("../db/data.json") ;
const { v1: uuidv1 } = require('uuid');
router.get("/items",function(request,response){
    fs.readFile("db/data.json","utf8",function(err,data){
        if(err){
            console.log("Error in reading from file",data);
            response.json(err)
        }
        db = JSON.parse(data)
        console.log("Data",db,err)
        response.json(db)
    })

});

router.post("/item",function(request,response){
    console.log(request.body);
    var record = {
        id: uuidv1(),
        itemdescription:request.body.itemdescription,
        quantity: request.body.quantity,
        shopname: request.body.shopname
    }
    db.push(record);
    fs.writeFile("db/data.json",JSON.stringify(db),function(err,data){
        if(err){
            console.log("Unable to write data to file",err)
            response.json(err)
        }
        else{
            console.log("Data",db)
            response.json(db);
        }
    
     
    })
   
});

router.delete("/item/:id",function(request,response){
    let  newdb = db.filter(function(item){
         return item.id !== request.params.id
    });
    db=newdb;
    console.log("Filtered Array",db);
    fs.writeFile("db/data.json",JSON.stringify(db),function(err,data){
        if(err){
            console.log("Unable to write data to file",err)
            response.json(err)
        }
        else{
            console.log("Data",db)
            response.json(db);
        }
  
    })
})

module.exports = router;