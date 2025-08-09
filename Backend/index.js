import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"


import authRoutes from './routes/AuthRoutes.js'
import teacherRoutes from './routes/TeacherRoutes.js'

const app = express()

//middlewares 
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);

dotenv.config()

const PORT=process.env.PORT||4000
const URI=process.env.MongoDB_URI

try {
mongoose.connect(URI)
console.log("Database connected successfully")
  
} catch (error) {
  console.log("error",error)
  
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
