import express, { Request } from "express"
import { ACCEPTED_ORIGINS } from '../middlewares/cors'
import cors from "cors";

import router from "../routes/Interpreter"

export const createApp = () => {
    const app = express()
    app.use(express.json())
    // const allowedOrigins = ['http://localhost:5173'];

    // const options: cors.CorsOptions = {
    //     origin: allowedOrigins
    // };
    var corsOptions = {
        origin: 'http://localhost:5173',
        credentials: true,  // This allows cookies to be sent
    };
    app.use(cors(corsOptions));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // especifica tu origen aquí
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // nota que 'true' es una cadena
        next();
    });

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