var router = require("express").Router()
var db = require("../db/data.json") || [];
var fs = require("fs");
router.get("/items",function(request,response){
    response.json(db)
});

router.post("/item",function(request,response){
    console.log(request.body);
    db.push(request.body);
    fs.writeFile("db/data.json",db,function(err,data){
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