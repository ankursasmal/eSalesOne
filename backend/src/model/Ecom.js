let mongoose=require('mongoose');
let validator=require('validator');

let userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
     },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        },
 
    },
    
    googleId:{
            type:String,

    },
    password:{
        type:String,
      },
    cpassword:{
        type:String,
      },
     role:{     
           type:String,
     },
     date:{
        type:String,

     },
     retailer:{
        companyName:{
            type:String,
          },
         brendname:{
            type:String,
        }, 
        companyImg:{
            type:[],
          },
          location:{
            type:String,
          },
          productType:{     
               type:String,
         },
         establish:{
            type:String,
    
         },
     }
     
})

let Ecomuser=new mongoose.model('Ecomuser',userSchema);
module.exports=Ecomuser

