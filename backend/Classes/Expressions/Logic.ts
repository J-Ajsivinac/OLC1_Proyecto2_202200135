import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Logic extends Expression {
    private type: Types = Types.NULL
    constructor(line: number, column: number, public exp1: Expression, public sign: string, public exp2: Expression) {
        super(line, column, TypesExp.LOGICAL)
    }
    public execute(env: Environment): ReturnType {
        switch (this.sign) {
            case '&&':
                return this.and(env)
            case '||':
                return this.or(env)
            case '!':
                return this.not(env)
            default:
                errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `El operador ${this.sign} no es valido`))
                return { value: -1, type: Types.NULL }
        }
    }

    and(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN
        return { value: val1.value && val2.value, type: this.type }
    }

    or(env: Environment): ReturnType {
        let val1: ReturnType = this.exp1.execute(env)
        let val2: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN
        return { value: val1.value || val2.value, type: this.type }
    }

    not(env: Environment): ReturnType {
        let val: ReturnType = this.exp2.execute(env)
        this.type = Types.BOOLEAN
        return { value: !val.value, type: this.type }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="LOGIC" color="white" fontcolor="white"]`
        let value1: ReturnAST = this.exp1.ast(ast)
        let value2: ReturnAST = this.exp2.ast(ast)
        if (this.exp1 != undefined) {
            dot += '\n' + value1.dot
            dot += `\nnode_${id}_sign [label="${this.sign}" fontcolor="white" color="white"]\n`
            dot += '\n' + value2.dot
            dot += `\nnode_${id} -> node_${value1.id};`
            dot += `\nnode_${id} -> node_${id}_sign;`
            dot += `\nnode_${id} -> node_${value2.id};`
        } else {
            dot += `\nnode_${id}_sign [label="${this.sign}" fontcolor="white" color="white"]\n`
            dot += '\n' + value2.dot
            dot += `\nnode_${id} -> node_${id}_sign;`
            dot += `\nnode_${id} -> node_${value2.id};`
        }
        return { dot: dot, id: id }
    }
}