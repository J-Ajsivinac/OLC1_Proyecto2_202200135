import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class DoWhile extends Instruction {
    constructor(line: number, column: number, private condition: Instruction, private block: Instruction) {
        super(line, column, TypesInstruction.LOOP_DO_WHILE);
    }

    public execute(env: Environment) {
        let condition: ReturnType | null = null;
        const doWhileEnv = new Environment(env, `${env.name} do while`);
        do {
            const block: ReturnType = this.block.execute(env);
            if (block) {
                if (block.value === TypesInstruction.CONTINUE) {
                    condition = this.condition.execute(doWhileEnv);
                    continue;
                } else if (block.value === TypesInstruction.BREAK) {
                    break;
                }
                return block
            }
            condition = this.condition.execute(doWhileEnv);
        } while (condition?.value);
    }

    public ast(ast: AST): ReturnAST {
        throw new Error("Method not implemented.");
    }
}