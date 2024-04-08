import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class If extends Instruction {
    constructor(line: number, column: number, private condition: any, private block: Instruction, private elseBlock: Instruction | null) {
        super(line, column, TypesInstruction.IF);
    }

    public execute(env: Environment) {
        let condition: ReturnType = this.condition.execute(env);
        if (condition.value) {
            let block: ReturnType = this.block.execute(env);
            if (block) {
                return block;
            }
            return
        }
        if (this.elseBlock) {
            let elseBlock: ReturnType = this.elseBlock.execute(env);
            if (elseBlock) {
                return elseBlock;
            }
        }
    }

}