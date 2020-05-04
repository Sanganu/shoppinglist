const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("./app"))

app.use("/api",require("./routes/apiroutes.js"))
app.use("/",require("./routes/htmlroutes.js"))


app.listen(PORT,() => {
    console.log("App listening on",PORT)
})
