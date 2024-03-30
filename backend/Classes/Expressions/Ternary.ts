import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Ternary extends Expression {
    private env!: Environment;
    constructor(line: number, column: number, public condition: Expression, public ifTrue: Expression, public ifFalse: Expression) {
        super(line, column, TypesExp.TERNARY);
    }

    public execute(env: Environment): ReturnType {
        this.env = env;
        const condition = this.condition.execute(this.env);
        if (condition.type === Types.BOOLEAN) {
            return condition.value ? this.ifTrue.execute(this.env) : this.ifFalse.execute(this.env);
        }
        return { value: 'NULL', type: Types.NULL };
    }
}