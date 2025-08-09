import asyncHandler from 'express-async-handler'
import { Student } from '../models/User.model.js'

// create a student (teacher)
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, className, rollNumber, guardian } = req.body;
  if (!name || !email) { res.status(400); throw new Error('Missing required data '); }
  const exists = await Student.findOne({ email });
  if (exists) { res.status(400); throw new Error('Student already exists'); }

  const student = await Student.create({
    name, email,
    password: 'changeme123', 
    role: 'student',
    className, rollNumber, guardian,
    assignedTeacher: req.user._id
  });

  res.status(201).json(student);
});

const getMyStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ assignedTeacher: req.user._id }).select('-password');
  res.json(students);
});

export { createStudent, getMyStudents };
