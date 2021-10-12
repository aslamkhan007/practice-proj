const mongoose =require('mongoose');
require("dotenv").config();
console.log(process.env.DB_CONNECTION,"nnnnnnn");
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        keepAlive: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true ,
        useCreateIndex: true,
        useFindAndModify:false
    },
    (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("database connect success fully");
        }
    }
)