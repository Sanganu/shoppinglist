var router = require("express").Router()
var db = require("../db/data.json");

router.get("/api/friends",function(request,response){
    res.json(db)
});

router.post("/api/friends",function(request,response){
    console.log(req.body);
    db.push(req.body);
    res.json(db);
});

module.exports = router;