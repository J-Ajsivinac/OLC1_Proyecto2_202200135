import { Expression } from "../Abstracts/Expression";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { plus, minus, mult, div, pow, mod } from '../Utils/MatrixOp';
import { Environment } from "../Env/Environment";
import { errores } from "../Utils/Outs";
import { Error, TypesError } from "../Utils/Error";
import { AST, ReturnAST } from "../Utils/AST";
export class Arithmetic extends Expression {
    private type: Types = Types.NULL
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.ARITHMETIC);
    }

    public execute(env: Environment): ReturnType {

        switch (this.sign) {
            case '+':
                return this.plus(env);
            case '-':
                if (this.exp1 != undefined) {
                    return this.minus(env);
                }
                return this.negative(env);
            case '*':
                return this.mult(env);
            case '/':
                return this.div(env);
            case '^':
                return this.pow(env);
            case '%':
                return this.mod(env);
            default:
                errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'Operador no valido en operacion aritmetica'))
                return { value: -1, type: Types.NULL };
        }
    }

    plus(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);

        this.type = plus[val1.type][val2.type];
        // console.log('type 1', val1.type, 'type 2', val2.type)
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede sumar los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = val1.value + val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = parseFloat(val1.value) + parseFloat(val2.value)
        }
        result = val1.value + val2.value
        return { value: result, type: this.type }
    }

    minus(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);
        this.type = minus[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede restar los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = val1.value - val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = parseFloat(val1.value) - parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    negative(env: Environment): ReturnType {
        let value: ReturnType = this.exp2.execute(env);
        this.type = value.type
        if (this.type === Types.INT || this.type === Types.DOUBLE) {
            return { value: -value.value, type: this.type }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede negar el tipo de dato ${value.type}`))
        return { value: 'NULL', type: Types.NULL }
    }

    mult(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);
        this.type = mult[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede multiplicar los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        if (this.type === Types.INT) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = val1.value * val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = parseFloat(val1.value) * parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    div(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);
        this.type = div[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede dividir los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            if (val2.value === 0) {
                env.setErrore(this.line, this.column + 1, `Division por 0`)
                return { value: -1, type: Types.NULL }
            }
            result = parseFloat(val1.value) / parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    pow(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);
        this.type = pow[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede realizar la potencia entre los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        if (this.type === Types.INT) {
            result = val1.value ** val2.value
        }
        else if (this.type === Types.DOUBLE) {
            val1 = this.getValue(val1, env)
            val2 = this.getValue(val2, env)
            result = parseFloat(val1.value) ** parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    mod(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env);
        let val2: ReturnType = this.exp2.execute(env);
        this.type = mod[val1.type][val2.type];
        let result: any = 'NULL'
        if (this.type === Types.NULL) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede aplicar el modulo entre los tipos de datos ${val1.type},${val2.type}`));
            return { value: null, type: Types.NULL }
        }

        if (this.type === Types.DOUBLE) {
            if (val2.value === 0) {
                //error
                return { value: -1, type: Types.NULL }
            }
            result = parseFloat(val1.value) % parseFloat(val2.value)
        }
        return { value: result, type: this.type }
    }

    getValue(value: ReturnType, env: Environment): ReturnType {
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
                // errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `Valor entero fuera de rango`))
                env.setErrore(this.line, this.column + 1, `Valor entero fuera de rango, rango entre -2147483648 y 2147483647`)
                if (value.value < -2147483648) {
                    return { value: -2147483648, type: Types.INT }
                }
                return { value: 2147483647, type: Types.INT }
            }
        }
        return value
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="ARITHMETIC" color="white" fontcolor="white"]\n`
        let value1: ReturnAST

        if (this.sign === '^') {
            dot += `\nnode_${id}_arit[label="pow" color="white" fontcolor="white"];`
            dot += `\nnode_${id}_lpars[label="(" color="white" fontcolor="white"];`
            value1 = this.exp1.ast(ast)
            dot += '\n' + value1.dot
            dot += `\nnode_${id}_comma[label="," color="white" fontcolor="white"];`
            let value2: ReturnAST = this.exp2.ast(ast)
            dot += '\n' + value2.dot

            dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"];`
            dot += `\nnode_${id} -> node_${id}_arit;`
            dot += `\nnode_${id} -> node_${id}_lpars;`
            dot += `\nnode_${id} -> node_${value1.id};`
            dot += `\nnode_${id} -> node_${id}_comma;`
            dot += `\nnode_${id} -> node_${value2.id};`
            dot += `\nnode_${id} -> node_${id}_rpars;`
        } else {
            if (this.exp1 != undefined) {
                value1 = this.exp1.ast(ast)
                dot += '\n' + value1.dot
                dot += `\nnode_${id} -> node_${value1.id};`
            }
            dot += `node_${id}_arit[label="${this.sign}" color="white" fontcolor="white"];`
            dot += `\nnode_${id} -> node_${id}_arit;`
            let value2: ReturnAST = this.exp2.ast(ast)
            dot += '\n' + value2.dot
            dot += `\nnode_${id} -> node_${value2.id};`
            // dot += `\nnode_${id} -> node_${id}_arit;`
        }
        return { dot: dot, id: id }
    }

}