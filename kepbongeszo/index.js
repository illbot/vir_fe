var express = require("express");
var app = express();

app.use(express.static("dist/kepbongeszo"));
app.get("/", function(req, res){
    res.redirect("/");
});

app.listen(4200)