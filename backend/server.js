import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import petRoutes from './routes/petRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/updoadRoutes.js'
import petNoteRoutes from './routes/petNoteRoutes.js'
import favRoutes from './routes/favRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/pets', petRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/petnote', petNoteRoutes)
app.use('/api/favpet', favRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
