import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authMiddleware from './middlewares/authMiddleWare.js'
import taskRouter from './routes/taskRoutes.js'

dotenv.config()

const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false // Do not allow credentials when using wildcard origins
}

const app = express()

app.use(cors(corsOptions))

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // or app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse multipart/form-data (for file uploads)
// app.use(multer().any());

app.use(authMiddleware)

app.use('/task', taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`)
})