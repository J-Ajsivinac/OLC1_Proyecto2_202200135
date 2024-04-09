import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { Symbol } from "../Env/Symbol";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class AccessID extends Expression {
    private type: Types = Types.NULL
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypesExp.ACCESS_ID);
    }

    public execute(env: Environment): ReturnType {
        const value: Symbol | null = env.getValue(this.id);
        if (value) {
            if (value.type === Types.ARRAY) {
                this.type = Types.STRING
                return { value: value.value, type: this.type }
            }
            this.type = value.type
            return { value: value.value, type: value.type };
        }
        throw new Error(`Identifier ${this.id} doesn't exist`);
    }

}