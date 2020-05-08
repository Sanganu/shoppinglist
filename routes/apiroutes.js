const router = require("express").Router()
const fs = require("fs");
let  db = require("../db/data.json") ;
const { v1: uuidv1 } = require('uuid');
router.get("/items",function(request,response){
   
    response.json(db)
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
            console.log("DAta",db)
            response.json(db);
        }
    
     
    })
   
});

module.exports = router;