import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { TypesInstruction } from "../Utils/TypesIns";
import { Case } from "./Case";

export class Switch extends Instruction {

    constructor(line: number, column: number, private exp: Expression, private cases: Case[], private defaultCase: Instruction) {
        super(line, column, TypesInstruction.SWITCH);
    }

    public execute(env: Environment) {
        const envSwitch: Environment = new Environment(env, `Switch`);
        if (this.cases) {
            let case_: Case
            let exp: ReturnType = this.exp.execute(env)
            for (case_ of this.cases) {
                case_.setCase(exp)
                let block: ReturnType = case_.execute(envSwitch)
                if (block) {
                    if (block.value === TypesExp.RETURN) return
                    else if (block.value === TypesInstruction.BREAK) return
                    return block
                }

            }
        }

        if (this.defaultCase) {
            let block: ReturnType = this.defaultCase.execute(envSwitch)
            if (block) {
                if (block.value === TypesExp.RETURN) return
                else if (block.value === TypesInstruction.BREAK) return
                return block
            }

        }
    }

    public ast(ast: AST): ReturnAST {
        throw new Error("Method not implemented.");
    }

}