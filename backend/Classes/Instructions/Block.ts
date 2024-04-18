import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { IncrDecr } from "../Expressions/IncrDecr";
import { AST, ReturnAST } from "../Utils/AST";
import { TypesInstruction } from "../Utils/TypesIns";

export class Block extends Instruction {
    constructor(line: number, column: number, private instructions: Instruction[]) {
        super(line, column, TypesInstruction.BLOCK)
    }

    public execute(env: Environment): any {
        const blockEnv = new Environment(env, `${env.name} block`)
        for (let instruction of this.instructions) {
            try {
                const ret = instruction.execute(blockEnv)
                if (ret && !(instruction instanceof IncrDecr)) {
                    return ret
                }
            } catch (error) { }
        }
    }


    public ast(ast: AST): ReturnAST {
        throw new Error("Method not implemented.");
    }
}