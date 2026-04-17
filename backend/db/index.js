import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const TaskSchema = new mongoose.Schema({
  day: Number,
  pushup: Boolean,
  squats: Boolean,
  crunches: Boolean,
  wake: Boolean,
  sleep: Boolean,
  cigg: Boolean,
  drink: Boolean,
  coffee: Boolean,
  salad: Boolean,
  snack: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);

export { Task };
