import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
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
}