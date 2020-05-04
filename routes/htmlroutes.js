var router = require("express").Router();


router.get("/",function(request,response){
    response.sendFile("./app/public/index.html");
});


router.get('/report',function(request,response){
   response.sendFile("./app/public/report.html");
});

module.exports = router;