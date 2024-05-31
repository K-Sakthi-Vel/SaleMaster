// requiring express
const express = require("express");
// requiring mongoose
const mongoose = require("mongoose");
// getting database schema to communicate with db
const Product = require("./Models/schema")
// conneting to database
mongoose.connect("mongodb://127.0.0.1/sale_master")
// cors for allow external domain api call's
const cors = require("cors")

const app = express();
// using as middleware
app.use(cors());

app.use(express.json());
// route and controller for populating data into database that is been fetched from react front end
app.post("/seed_database",async(req,res)=>{
    const products=await Product.find();
    if(products.length === 0){
        let pages = []
        let page =[]
        let count = 0
        for (let i = 0; i<=req.body.products.length;i++){
            if (count !== 9){
                page.push(req.body.products[i])
                count+=1
            }
            else{
                page.push(req.body.products[i])
                pages.push(page)
                page=[]
                count=0
            }
        }
        await Product.create({
            products:pages
        })
        .then( result => res.json(result))
        .catch(err => res.json(err))
    }
    
})
// route and controller for get all products exist inside database 
app.get("/get_products", (req,res)=>{
    Product.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
// initialize and running server
app.listen(3001,(err)=>{
    if(err){
        console.log("Error in starting server")
        return;
    }
    console.log("Server started :)")
})