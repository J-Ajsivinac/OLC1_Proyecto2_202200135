import express from "express"
import { corsMiddleware } from '../middlewares/cors'

import router from "../routes/Interpreter"

export const createApp = () => {
    const app = express()
    app.use(express.json())
    app.use(corsMiddleware())

    app.get('/', (req, res) => {
        res.send('Backend is running...')
    })
    app.use('/interpreter', router)

    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}

createApp()