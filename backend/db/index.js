import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const TaskSchema = new mongoose.Schema({
  day: Number,
  workout: Boolean,
  eggs: Boolean,
  macro: Boolean,
  read: Boolean,
  dsa: Boolean,
  temple: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);

export { Task };
