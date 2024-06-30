import { Router } from 'express'
import { updateExisting } from '../middlewares/taskMiddlewares.js'

import { Task } from '../db/index.js'

const router = Router()

router.post('/track', updateExisting, (req, res) => {
    const tracker = req.body
    Task.create(tracker)
    res.json({ msg: "Task Created Successfully" })
})

router.post('/getTask', (req, res) => {
    Task.findOne({ day: new Date().getDate() })
      .then(existingTask => {
        res.json(existingTask)
      })
})

export default router