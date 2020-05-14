const express = require("express");
const ephbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

app.engine("handlebars",ephbs({defaultLayout:"main"}));
app.set("view engine","handlebars")

app.use("/",require("./routes/controller.js"))

app.listen(PORT,() => {
    console.log("App listening on",PORT)
})
