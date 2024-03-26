export class Controller {
    public runing() {
        console.log("Interpreter is running...")
    }
    public parser() {
        let code = "execute (double) 16;execute (int) 18.2;execute (string) 2; execute (char) 70 ;execute (string) 19.2; execute (int) 'F'; execute (double) 'F';"
        let parser = require('../Analyzer/Parser')
        let ast = parser.parse(code)

        for (let instruction of ast) {
            let res = instruction.execute()
            console.log(res)
        }
    }
}