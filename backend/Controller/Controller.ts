export class Controller {
    public runing() {
        console.log("Interpreter is running...")
    }
    public parser() {
        let code = "execute 4*(2-3)/3;"
        let parser = require('../Analyzer/Parser')
        let ast = parser.parse(code)

        for (let instruction of ast) {
            let res = instruction.execute()
            console.log(res)
        }
    }
}