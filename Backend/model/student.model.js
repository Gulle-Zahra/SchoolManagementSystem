import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
    fullname:{type:String , required:true},
    RegistrationNo:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    class:{type:String}

 
})

const Student=mongoose.model("Student",StudentSchema);

export default Student;