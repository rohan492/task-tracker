import { mongoose } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const TaskSchema = new mongoose.Schema({
    day: Number,
    dsa: Boolean,
    course: Boolean,
    exercise: Boolean,
    temple: Boolean,
    "6wake": Boolean,
    "11sleep": Boolean,
})

const Task = mongoose.model('Task', TaskSchema)

export { Task }