import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Return extends Expression {
    private type: Types = Types.NULL;
    constructor(line: number, column: number, public value: Expression,) {
        super(line, column, TypesExp.RETURN);
    }
    public execute(env: Environment): ReturnType {
        if (!this.value) {
            return { value: null, type: Types.NULL }
        }
        let value: ReturnType = this.value.execute(env);
        this.type = value.type;
        return { value: value.value, type: value.type }
    }
}