import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultArray } from "../Utils/Defaults";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class InitArray extends Instruction {
    private type: Types;
    constructor(line: number, column: number, private id: string, private tempType: string, public size: Expression, public values: any[]) {
        super(line, column, TypesInstruction.INIT_ARRAY)
        this.type = convertToType(tempType)
    }

    public execute(env: Environment) {
        if (this.values) {
            console.log("Values --> ", this.values)
            for (let i = 0; i < this.values.length; i++) {
                this.values[i] = this.values[i].execute(env)
                console.log("Values --> ", this.values[i])
            }
            console.log("Tipo --> ", this.type)
            env.saveArray(this.id, this.type, this.values, this.line, this.column)
        } else {
            let length: ReturnType = this.size.execute(env)
            env.saveArray(this.id, this.type, this.arrayByLength(length.value, this.type), this.line, this.column)
        }
    }

    private arrayByLength(length: number, type: Types): Array<any> {
        let l = new Array(length)
        for (let i = 0; i < length; i++) {
            l[i] = getValueDefaultArray(type, this.type)
        }
        return l
    }

}