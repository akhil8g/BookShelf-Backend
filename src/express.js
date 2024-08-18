const express = require('express');
const cors = require('cors');
const morgan = require('morgan');



const app =express();
const books =require('./booksModule');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const bookRoutes = require('./routes/bookRoutes');
app.use("/api/v1/bookRoutes", bookRoutes);

app.get('/*',(req,res)=>{
    res.send("No routes Found");
});


app.listen(4000,()=> console.log("Server running on port 4000"));
