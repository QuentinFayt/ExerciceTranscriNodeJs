const express = require("express");
const path = require("path");
const app = express();
const url = require("url");
app.use(express.static(path.join(__dirname,"public")));
const whiteList = ["presentation","aventure","realisations"];

app.get("/",(req,resp)=>{
    resp.render("index.ejs",{page:"accueil"});
}).get("/p=:param",(req,resp)=>{
    const param = req.params.param;
    if(whiteList.includes(param)){
       resp.render(`index.ejs`,{page:param});
    }else{
        resp.redirect(url.format({
            pathname:"/",
            query:req.query
        }))
    }
}).use((req,resp,next)=>{
    throw new Error(req.protocol + "://" + req.hostname + req.url + " not found");
    next();
}).use((err,req,resp,next)=>{
    resp.status(404).render("index.ejs",{page:"404",error:err.message});
})
app.listen(8555);