export var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

export const corsM = function (req: any, res: any, next: any) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // especifica tu origen aquí
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // nota que 'true' es una cadena
    next();
}

