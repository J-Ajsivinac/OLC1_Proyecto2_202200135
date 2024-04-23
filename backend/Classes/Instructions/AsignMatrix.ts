import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Primitive } from "../Expressions/Primitive";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class AsignMatrix extends Instruction {
    constructor(line: number, column: number, public id: string, public index: Expression, public index2: Expression, public value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_MATRIX)
    }

    public execute(env: Environment) {
        let index: ReturnType = this.index.execute(env)
        let index2: ReturnType = this.index2.execute(env)
        let value: ReturnType = this.value.execute(env)
        let primitive = new Primitive(this.line, this.column, value.value, value.type)
        let resp = env.reasignMatrix(this.id, index.value, index2.value, primitive)
        if (!resp) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `Variable ${this.id} no encontrada`))
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="ASSIGN_MATRIX"];\n`

        dot += `\nnode_${id}_id [label="${this.id}"];\n`
        dot += `\nnode_${id}_lcor [label="["];\n`

        dot += `\nnode_${id} -> node_${id}_id\n`
        dot += `\nnode_${id} -> node_${id}_lcor\n`

        const index = this.index.ast(ast)
        dot += "\n" + index.dot + "\n"
        dot += `node_${id} -> node_${index.id}\n`

        dot += `\nnode_${id}_rcor [label="]"];\n`
        dot += `\nnode_${id} -> node_${id}_rcor\n`
        dot += `\nnode_${id}_lcor2 [label="["];\n`
        dot += `\nnode_${id} -> node_${id}_lcor2\n`

        const index2 = this.index2.ast(ast)
        dot += "\n" + index2.dot + "\n"
        dot += `node_${id} -> node_${index2.id}\n`

        dot += `\nnode_${id}_rcor2 [label="]"];\n`
        dot += `\nnode_${id} -> node_${id}_rcor2\n`

        dot += `\nnode_${id}_equal [label="="];\n`
        dot += `\nnode_${id} -> node_${id}_equal\n`

        const value = this.value.ast(ast)
        dot += "\n" + value.dot + "\n"
        dot += `node_${id} -> node_${value.id}\n`
        return { dot: dot, id: id }
    }

}