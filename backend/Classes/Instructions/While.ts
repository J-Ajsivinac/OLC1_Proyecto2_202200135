import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class While extends Instruction {
    constructor(line: number, column: number, private condition: any, private block: Instruction) {
        super(line, column, TypesInstruction.LOOP_WHILE)
    }

    public execute(env: Environment) {
        const whileEnv = new Environment(env, `${env.name} while`)
        let condition: ReturnType | null = this.condition.execute(env)
        while (condition?.value) {
            let block: ReturnType = this.block.execute(whileEnv)
            if (block) {
                if (block.value == TypesInstruction.BREAK) {
                    break
                } else if (block.value == TypesInstruction.CONTINUE) {
                    condition = this.condition.execute(whileEnv)
                    continue
                }
                return block
            }
            condition = this.condition.execute(whileEnv)
        }
    }
}