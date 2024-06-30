import { Router } from 'express'
import { updateExisting } from '../middlewares/taskMiddlewares.js'

import { Task } from '../db/index.js'

const router = Router()

router.post('/track', updateExisting, (req, res) => {
    const tracker = req.body
    Task.create(tracker)
    res.json({ msg: "Task Created Successfully" })
})

export default router