import { mongoose } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const TaskSchema = new mongoose.Schema({
    day: Number,
    taskArray: {
      type: Map,
      of: Boolean
    }
})

const Task = mongoose.model('Task', TaskSchema)

export { Task }