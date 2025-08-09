
import mongoose from 'mongoose';
import bcrypt from "bcryptjs"

const options = { discriminatorKey: 'role', timestamps: true };

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: String,
  isActive: { type: Boolean, default: true }
}, options);


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', UserSchema);


const Principal = User.discriminator('principal', new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true } 
}));


const Teacher = User.discriminator('teacher', new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  subjects: [{ type: String }],
  classes: [{ type: String }]
}));


const Student = User.discriminator('student', new mongoose.Schema({
  rollNumber: { type: String, unique: true, sparse: true },
  className: String,
  guardian: {
    name: String,
    phone: String
  },
  assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}));

export { User, Principal, Teacher, Student };
