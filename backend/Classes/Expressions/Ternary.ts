import { Expression } from "../Abstracts/Expression";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Ternary extends Expression {
    constructor(line: number, column: number, public condition: Expression, public ifTrue: Expression, public ifFalse: Expression) {
        super(line, column, TypesExp.TERNARY);
    }

    public execute(): ReturnType {
        const condition = this.condition.execute();
        if (condition.type === Types.BOOLEAN) {
            return condition.value ? this.ifTrue.execute() : this.ifFalse.execute();
        }
        return { value: 'NULL', type: Types.NULL };
    }
}