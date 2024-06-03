import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Return } from "../Expressions/Return";
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
        // console.log("Case", case_.value, caseE.value)
        if (case_.value === caseE.value) {
            let block: ReturnType = this.block.execute(envCase)
            if (block) return block
        }
    }

    public getReturns():Return[]{
        let returns:Return[] = []
        let block: any = this.block as Instruction
        returns = block.getReturns()
        return returns
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="CASE"];\n`
        dot += `node_${id}_case [label="case" color="white" fontcolor="white"];\n`
        dot += `node_${id} -> node_${id}_case;\n`
        const exp = this.exp.ast(ast)
        dot += "\n" + exp.dot + "\n"
        dot += `node_${id} -> node_${exp.id};\n`
        dot += `node_${id}_colon[label=":"]\n`
        dot += `node_${id} -> node_${id}_colon;\n`
        if (this.block) {
            const block = this.block.ast(ast)
            dot += block.dot
            dot += `node_${id} -> node_${block.id};\n`
        }

        return { dot: dot, id: id }
    }
}