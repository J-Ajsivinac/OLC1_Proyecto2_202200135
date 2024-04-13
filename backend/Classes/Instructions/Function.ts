import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Parameter } from "../Expressions/Parameter";
import { convertToType } from "../Utils/ConvertTypes";
import { Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class Function extends Instruction {
    public types = Types.NULL
    constructor(line: number, column: number, public id: string, public params: Parameter[], public block: Instruction, public tempType: string) {
        super(line, column, TypesInstruction.INIT_FUNCTION);
        this.types = convertToType(tempType)
    }
    public execute(env: Environment) {
        console.log("-Funcion-", this.id)
        env.saveFunction(this.id, this)
    }
}