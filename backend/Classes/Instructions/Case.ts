import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class Case extends Instruction {
    private caseEvaluated: ReturnType | any = null
    constructor(line: number, column: number, private exp: Expression, private block: Instruction) {
        super(line, column, TypesInstruction.CASE);
    }

    public setCase(caseEvaluated: ReturnType) {
        this.caseEvaluated = caseEvaluated
    }

    public execute(env: Environment): ReturnType | any {
        const envCase: Environment = new Environment(env, `${env.name} case`)
        let caseE: ReturnType = this.caseEvaluated
        let case_: ReturnType = this.exp.execute(envCase)
        envCase.name = `${env.name} case ${case_.value}`
        console.log("Case", case_.value, caseE.value)
        if (case_.value === caseE.value) {
            let block: ReturnType = this.block.execute(envCase)
            if (block) return block
        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Case"];\n`
        //Hijo 1
        const exp = this.exp.ast(ast)
        dot += exp.dot
        dot += `node${id} -> node${exp.id}\n`
        //Hijo 2
        const block = this.block.ast(ast)
        dot += block.dot
        dot += `node${id} -> node${block.id}\n`
        return { dot: dot, id: id }
    }
}