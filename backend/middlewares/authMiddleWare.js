import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers?.authorization?.trim()?.split("Bearer")[1]?.trim()
    if (!token) {
        return res.status(401).json({ msg: "Authorization Token Required" })
    }

    if (token !== process.env.BACKEND_TOKEN) {
        return res.status(401).json({ msg: "Authorization Token Invalid" })
    }

    next()
}

export default authMiddleware