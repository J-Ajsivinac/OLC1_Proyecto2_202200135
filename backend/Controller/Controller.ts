import { Environment } from "../Classes/Env/Environment"

export class Controller {
    public runing() {
        console.log("Interpreter is running...")
    }
    public parser() {
        // let code = "execute (double) 16;execute (int) 18.2;execute (string) 2; execute (char) 70 ;execute (string) 19.2; execute (int) 'F'; execute (double) 'F';"
        let code = "int var4,var2 = 4;"
        let parser = require('../Analyzer/Parser')
        let ast = parser.parse(code)
        const global: Environment = new Environment(null, 'Global')
        for (let instruction of ast) {
            let res = instruction.execute(global)
            global.printSymTab()
            // console.log(res)
        }
    }
}