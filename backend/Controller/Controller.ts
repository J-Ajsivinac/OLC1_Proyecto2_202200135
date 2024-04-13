import { Request, Response } from "express";
import { Environment } from "../Classes/Env/Environment"
import { getConsoleString, getErrorsString, resetOuts } from "../Classes/Utils/Outs"
import { InitID } from "../Classes/Instructions/InitID";
import { InitArray } from "../Classes/Instructions/InitArray";
import { CallFunction } from "../Classes/Instructions/CallFunction";
export class Controller {
    public runing(_: Request, res: Response) {
        console.log("Interpreter is running...")
        res.json({
            console: "Interpreter is running..."
        })
    }
    public parser(req: Request, res: Response) {
        let code: string = req.body.code
        console.log("Code", code)
        // console.log(typeof code)
        let parser = require('../Analyzer/Parser')
        try {
            resetOuts()
            let ast = parser.parse(code)
            const global: Environment = new Environment(null, 'Global')
            console.log(ast.length)
            for (let instruction of ast) {
                // console.log("Instruction", instruction)
                try {
                    // if (instruction instanceof Function || instruction instanceof InitID || instruction instanceof InitArray || instruction instanceof CallFunction) {
                    //     console.log("Instruction", instruction)
                    //     instruction.execute(global)
                    // }
                    instruction.execute(global)
                    // console.log(getErrorsString())
                    console.log(getConsoleString())
                    // global.printSymTab()
                } catch (err) {
                    console.error(err)
                    res.json({
                        console: err
                    })
                }
            }
            res.json({
                console: getConsoleString()
            })
        } catch (err) {
            res.json({
                console: err
            })
            console.error(err)
        }
    }
}