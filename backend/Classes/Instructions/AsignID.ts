import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction"
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class AsignID extends Instruction {
    constructor(line: number, column: number, private id: string, private value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_ID)
    }

    public execute(env: Environment) {
        const val: ReturnType = this.value.execute(env)
        env.reasignID(this.id, val)
    }

}