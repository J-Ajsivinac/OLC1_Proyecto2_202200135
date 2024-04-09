import { Request, Response } from "express";
import { Environment } from "../Classes/Env/Environment"
import { getConsoleString, resetOuts } from "../Classes/Utils/Outs"
export class Controller {
    public runing(_: Request, res: Response) {
        console.log("Interpreter is running...")
        res.json({
            console: "Interpreter is running..."
        })
    }
    public parser(req: Request, res: Response) {
        let code: string = req.body.code
        // console.log(typeof code)
        let parser = require('../Analyzer/Parser')
        try {
            resetOuts()
            let ast = parser.parse(code)
            const global: Environment = new Environment(null, 'Global')
            for (let instruction of ast) {
                typeof instruction.execute === 'function' ? instruction.execute(global) : null
                console.log(getConsoleString())
                global.printSymTab()
                // console.log(res)
            }
            res.json({
                console: getConsoleString()
            })
        } catch (err) {
            res.json({
                console: err
            })
        }
    }
}