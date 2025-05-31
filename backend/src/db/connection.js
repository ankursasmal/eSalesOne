require('dotenv').config()
let mongoose=require('mongoose')

// connect with driver
async function connectionDB (){
   
     
    try{
mongoose.connect(process.env.MONGO_DRIVE_DB);
     console.log('db connect');
}
catch(e){
    console.log('db Not connect',e.message)
} 
}

module.exports=connectionDB