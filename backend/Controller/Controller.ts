import { Environment } from "../Classes/Env/Environment"
import { getConsoleString } from "../Classes/Utils/Outs"
export class Controller {
    public runing() {
        console.log("Interpreter is running...")
    }
    public parser() {
        // let code = "execute (double) 16;execute (int) 18.2;execute (string) 2; execute (char) 70 ;execute (string) 19.2; execute (int) 'F'; execute (double) 'F';"
        let code = "cout << 10*2 << endl;"
        let parser = require('../Analyzer/Parser')
        let ast = parser.parse(code)
        const global: Environment = new Environment(null, 'Global')
        for (let instruction of ast) {
            typeof instruction.execute === 'function' ? instruction.execute(global) : null
            console.log(getConsoleString())
            // console.log(res)
        }
    }
}