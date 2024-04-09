import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Logic extends Expression {
    private type: Types = Types.NULL
    private env!: Environment;
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.LOGICAL)
    }
    public execute(env: Environment): ReturnType {
        this.env = env
        switch (this.sign) {
            case '&&':
                return this.and()
            case '||':
                return this.or()
            case '!':
                return this.not()
            default:
                return { value: -1, type: Types.NULL }
        }
    }

    and(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
        this.type = Types.BOOLEAN
        return { value: val1.value && val2.value, type: this.type }
    }

    or(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
        this.type = Types.BOOLEAN
        return { value: val1.value || val2.value, type: this.type }
    }

    not(): ReturnType {
        let val: ReturnType = this.exp2.execute(this.env)
        this.type = Types.BOOLEAN
        return { value: !val.value, type: this.type }
    }
}