import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Relational extends Expression {
    private type: Types = Types.NULL
    private env!: Environment
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.RELATIONAL)
    }

    public execute(env: Environment): ReturnType {
        this.env = env
        switch (this.sign) {
            case '==':
                return this.equal()
            case '!=':
                return this.different()
            case '>':
                return this.greater()
            case '<':
                return this.less()
            case '>=':
                return this.greaterEqual()
            case '<=':
                return this.lessEqual()
            default:
                return { value: -1, type: Types.NULL }
        }
    }

    equal(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
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

    different(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
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

    greater(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
        this.type = Types.BOOLEAN

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

    less(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
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

    greaterEqual(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
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

    lessEqual(): ReturnType {
        let val1: ReturnType = this.exp1.execute(this.env)
        let val2: ReturnType = this.exp2.execute(this.env)
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
        dot += `\nnode_${id}_sign [label="${this.sign}", fillcolor="LightBlue", shape="box", style="filled", fontsize="15"]\n`
        let val2 = this.exp2.ast(ast)
        dot += val2.dot
        // conectando nodos
        dot += `\nnode_${id} -> node_${val1.id};`
        dot += `\nnode_${id} -> node_${id}_sign;`
        dot += `\nnode_${id} -> node_${val2.id};`
        return { dot: dot, id: id }
    }
}