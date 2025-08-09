import mongoose from 'mongoose';


const TeacherSchema = new mongoose.Schema({
    fullname:{type:String , required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    contactNo:{type:String,required:true},
    class:{type:String,required:true},
    address:{type:String,required:true},

})

const Teacher=mongoose.model("Teacher",TeacherSchema);

export default Teacher;