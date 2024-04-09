import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { TypesInstruction } from "../Utils/TypesIns";

export class Function extends Instruction {
    constructor(line: number, column: number, public id: string, public params: Instruction, public instructions: Instruction) {
        super(line, column, TypesInstruction.INIT_FUNCTION);
    }
    public execute(env: Environment) {
        // throw new Error("Method not implemented.");

    }
}