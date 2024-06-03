import express, { Request } from "express"
import cors from "cors";

import router from "../routes/Interpreter"
import { saveFile } from "../Controller/SaveFiles";
import { corsM, corsOptions } from "../middlewares/cors";

export const createApp = () => {
    const app = express()
    app.use(express.json())
    app.use(cors(corsOptions));
    app.use(corsM);

    app.get('/', (req, res) => {
        res.send('Backend is running...')
    })
    app.use('/interpreter', router)

    app.post('/save', saveFile)

    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}

createApp()