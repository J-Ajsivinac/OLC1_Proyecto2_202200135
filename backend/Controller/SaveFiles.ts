
const fs = require('fs');
import { Request, Response } from "express";

export const saveFile = async (req: Request, res: Response) => {
    const { filename, content } = req.body;
    fs.writeFile(filename, content, (err: any) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al guardar el archivo');
        } else {
            res.send('Archivo guardado con éxito');
        }
    });
};