const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path");
const { log } = require("console");

main().then(()=>{
    console.log('connet to db');
    
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))

app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs",{listing})
})

app.post("/listings",(req,res)=>{
    const newListing = new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listings")
    
})

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "harry potter",
//         description : "this is the descp",
//         price : 67786,
//         country : "india"
//     })
//     await sampleListing.save()
//     console.log('data saved');
//     res.send("success")
// })

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(8080 , ()=>{
    console.log('server is listening');
})