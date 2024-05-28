import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction"
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class AsignID extends Instruction {
    constructor(line: number, column: number, private id: string, private value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_ID)
    }

    public execute(env: Environment) {
        const val: ReturnType = this.value.execute(env)
        let resp = env.reasignID(this.id, val)
        if (!resp) {
            // errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `Variable ${this.id} no encontrada ->`))
            env.setErrore(this.line, this.column + 1, `Variable ${this.id} no encontrada`)
        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="SET" color="white" fontcolor="white"];\n`
        let value1: ReturnAST = this.value.ast(ast)
        dot += `\nnode_${id}_id[label="${this.id}" color="white" fontcolor="white"]`
        dot += `\nnode_${id} -> node_${id}_id`
        dot += '\n' + value1.dot + '\n'
        dot += `\nnode_${id} -> node_${value1.id};\n`
        return { dot: dot, id: id }
    }

}