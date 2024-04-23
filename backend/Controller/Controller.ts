import { Request, Response } from "express";
import { Environment } from "../Classes/Env/Environment"
import { getConsoleString, getErrorsString, resetOuts } from "../Classes/Utils/Outs"
import { InitID } from "../Classes/Instructions/InitID";
import { InitArray } from "../Classes/Instructions/InitArray";
import { AST, ReturnAST } from "../Classes/Utils/AST";
import { MExecute } from "../Classes/Instructions/MExecute";
import { InitMatrix } from "../Classes/Instructions/InitMatrix";
import { Function } from "../Classes/Instructions/Function";
export class Controller {
    public runing(_: Request, res: Response) {
        console.log("Interpreter is running...")
        res.json({
            console: "Interpreter is running..."
        })
    }
    public parser(req: Request, res: Response) {
        let code: string = req.body.code
        console.log("Code", code, "fin")
        // console.log(typeof code)
        let parser = require('../Analyzer/Parser')
        try {
            var res_dotAST: string = ''
            resetOuts()
            let ast = parser.parse(code)
            const global: Environment = new Environment(null, 'Global')

            let astTree: AST = new AST()
            var dotAST: string = 'digraph G{\nnode[color="#cec9f1" fontcolor="white" fontname=Verdana];\nedge[dir=none color="#cec9f1"];\nbgcolor = "#0D1117";\n'
            dotAST += '\nnode_r[label="INSTRUCCIONES" color="#7580f9" fontcolor="white"];'
            var resultAST: ReturnAST
            let main: MExecute | null = null
            for (let instruction of ast) {
                try {
                    if (instruction instanceof Function || instruction instanceof InitID || instruction instanceof InitArray || instruction instanceof InitMatrix) {
                        console.log(instruction)
                        instruction.execute(global)
                        resultAST = instruction.ast(astTree)
                        dotAST += '\n' + resultAST.dot
                        dotAST += `\nnode_r -> node_${resultAST.id};`
                    } else if (instruction instanceof MExecute) {
                        main = instruction
                        resultAST = instruction.ast(astTree)
                        dotAST += '\n' + resultAST.dot
                        dotAST += `\nnode_r -> node_${resultAST.id};`
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            if (main) {
                console.log("hay main", main)
                main.execute(global)
            }
            dotAST += '\n}'
            res_dotAST = dotAST
            res.json({
                console: getConsoleString(),
                ast: dotAST
            })
        } catch (err) {
            res.json({
                console: err
            })
        }
    }
}