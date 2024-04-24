import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Relational extends Expression {
    private type: Types = Types.NULL

    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.RELATIONAL)
    }

    public execute(env: Environment): ReturnType {
        switch (this.sign) {
            case '==':
                return this.equal(env)
            case '!=':
                return this.different(env)
            case '>':
                return this.greater(env)
            case '<':
                return this.less(env)
            case '>=':
                return this.greaterEqual(env)
            case '<=':
                return this.lessEqual(env)
            default:
                errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `El operador ${this.sign} no es valido`))
                return { value: -1, type: Types.NULL }
        }
    }

    equal(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN

        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value === val2.value, type: this.type }
            }
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
            return { value: -1, type: Types.NULL }
        }

        if (val1.type === Types.STRING && val2.type === Types.STRING) {
            return { value: val1.value === val2.value, type: this.type }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
        return { value: -1, type: Types.NULL }
    }

    different(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN

        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value !== val2.value, type: this.type }
            }
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
            return { value: -1, type: Types.NULL }
        }

        if (val1.type === Types.STRING && val2.type === Types.STRING) {
            val1 = this.getValue(val1)
            val2 = this.getValue(val2)
            return { value: val1.value !== val2.value, type: this.type }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
        return { value: -1, type: Types.NULL }
    }

    greater(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN

        // console.log(this.exp1, this.exp2, "\n>-------<")
        // console.log(val1, val2, "\n777777777")
        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value > val2.value, type: this.type }
            }
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
            return { value: -1, type: Types.NULL }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
        return { value: -1, type: Types.NULL }
    }

    less(env: Environment): ReturnType {
        let val2: ReturnType = this.exp2.execute(env)
        let val1: ReturnType = this.exp1.execute(env)
        this.type = Types.BOOLEAN

        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value < val2.value, type: this.type }
            }
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
            return { value: -1, type: Types.NULL }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, 'No se puede comparar el tipo ' + val1.type + ' con ' + val2.type))
        return { value: -1, type: Types.NULL }
    }

    greaterEqual(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN

        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value >= val2.value, type: this.type }
            }
            return { value: -1, type: Types.NULL }
        }
        return { value: -1, type: Types.NULL }
    }

    lessEqual(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN

        if (val1.type === Types.INT || val1.type === Types.DOUBLE || val1.type === Types.CHAR) {
            if (val2.type === Types.INT || val2.type === Types.DOUBLE || val2.type === Types.CHAR) {
                val1 = this.getValue(val1)
                val2 = this.getValue(val2)
                return { value: val1.value <= val2.value, type: this.type }
            }
            return { value: -1, type: Types.NULL }
        }
        return { value: -1, type: Types.NULL }
    }

    getValue(value: ReturnType): ReturnType {
        return value.type === Types.CHAR ? { value: value.value.charCodeAt(0), type: Types.INT } : value
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="RELATIONAL" color="#f39c12" fontcolor="white"];`
        let val1 = this.exp1.ast(ast)
        dot += val1.dot
        dot += `\nnode_${id}_sign [label="${this.sign}" fontcolor="white" color="white"]\n`
        let val2 = this.exp2.ast(ast)
        dot += val2.dot
        // conectando nodos
        dot += `\nnode_${id} -> node_${val1.id};`
        dot += `\nnode_${id} -> node_${id}_sign;`
        dot += `\nnode_${id} -> node_${val2.id};`
        return { dot: dot, id: id }
    }
}