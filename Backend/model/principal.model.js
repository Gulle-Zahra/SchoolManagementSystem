import mongoose from 'mongoose';


const PrincipalSchema = new mongoose.Schema({
    fullname:{type:String , required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    contactNo:{type:String,required:true}
})

const Principal=mongoose.model("Principal",PrincipalSchema);

export default Principal;