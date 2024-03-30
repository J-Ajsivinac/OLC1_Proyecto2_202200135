import { Expression } from "../Abstracts/Expression";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { plus, minus, mult, div, pow, mod } from '../Utils/MatrixOp';
import { Environment } from "../Env/Environment";

export class Arithmetic extends Expression {
    private type: Types = Types.NULL
    private env!: Environment;
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.ARITHMETIC);
    }

    public execute(env: Environment): ReturnType {
        this.env = env
        switch (this.sign) {
            case '+':
                return this.plus();
            case '-':
                if (this.exp1 != undefined) {
                    return this.minus();
                }
                return this.negative();
            case '*':
                return this.mult();
            case '/':
                return this.div();
            case '^':
                return this.pow();
            case '%':
                return this.mod();
            default:
                return { value: -1, type: Types.NULL };
        }
    }

    plus(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = plus[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = val1.value + val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = parseFloat(val1.value) + parseFloat(val2.value)
        }
        result = val1.value + val2.value
        return { value: result, type: this.type }
    }

    minus(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = minus[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = val1.value - val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = parseFloat(val1.value) - parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    negative(): ReturnType {
        let value: ReturnType = this.exp2.execute(this.env);
        this.type = value.type
        if (this.type === Types.INT || this.type === Types.DOUBLE) {
            return { value: -value.value, type: this.type }
        }
        return { value: 'NULL', type: Types.NULL }
    }

    mult(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = mult[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = val1.value * val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = parseFloat(val1.value) * parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    div(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = div[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            if (val2.value === 0) {
                //error
                console.log('Division por 0')
                return { value: -1, type: Types.NULL }
            }
            result = parseFloat(val1.value) / parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    pow(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = pow[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        if (this.type === Types.INT) {
            result = val1.value ** val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            result = parseFloat(val1.value) ** parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    mod(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env);
        let val2: ReturnType = this.exp2.execute(this.env);
        this.type = mod[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) return { value: null, type: Types.NULL }

        if (this.type === Types.DOUBLE) {
            if (val2.value === 0) {
                //error
                return { value: -1, type: Types.NULL }
            }
            result = parseFloat(val1.value) % parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    getValue(value: ReturnType): ReturnType {
        if (value.type === Types.BOOLEAN) {
            // si es verdadero retornar 1, si es falso retornar 0
            return { value: value.value ? 1 : 0, type: Types.INT }
        }
        else if (value.type === Types.CHAR) {
            // retornar el valor ASCII del caracter
            return { value: value.value.charCodeAt(0), type: Types.INT }
        }
        //validar limites de enteros
        if (value.type === Types.INT) {
            if (value.value < -2147483648 || value.value > 2147483647) {
                //error
                return { value: null, type: Types.NULL }
            }
        }
        return value
    }

}