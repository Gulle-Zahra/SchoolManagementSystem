import express from 'express'


const router = express.Router();
import { createStudent, getMyStudents } from '../controllers/TeacherController.js'
import { protect, authorizeRoles } from '../middleware/Auth.js'

router.use(protect);
router.use(authorizeRoles('teacher','principal')); 

router.post('/students', createStudent);
router.get('/students', getMyStudents);

export default router;
