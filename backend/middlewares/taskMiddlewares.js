import { Task } from "../db/index.js";

const updateExisting = (req, res, next) => {
  const tracker = req.body;

  Task.findOne({ day: tracker.day })
    .then(async (existingTask) => {
      if (existingTask) {
        Object.assign(existingTask, { ...tracker })
        await existingTask.save()
        res.json({ msg: "Task Updated Successfully" })
      } else {
        next()
      }
    })
    .catch((err) => {
      console.error(`Error in task middleware: ${err}`);
      res.status(500).json({ msg: "An error occured in taskMiddleware" });
    });
};

export { updateExisting };
