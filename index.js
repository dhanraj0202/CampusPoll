const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req,res)=>{
    res.render('home.ejs')
})

app.get('/posts/login', (req,res) =>{
    res.render("login.ejs")
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
