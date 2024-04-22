import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Primitive } from "../Expressions/Primitive";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class AsignArray extends Instruction {
    constructor(line: number, column: number, public id: string, public index: Expression, public value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_ARRAY)
    }

    public execute(env: Environment) {
        let index: ReturnType = this.index.execute(env)
        let value: ReturnType = this.value.execute(env)
        let primitive = new Primitive(this.line, this.column, value.value, value.type)
        env.reasignArrayList(this.id, index.value, primitive)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="ASSIGN_ARRAY"];\n`

        dot += `\nnode_${id}_id [label="${this.id}"];\n`
        dot += `\nnode_${id}_lcor [label="["];\n`

        dot += `\nnode_${id} -> node_${id}_id\n`
        dot += `\nnode_${id} -> node_${id}_lcor\n`

        const index = this.index.ast(ast)
        dot += "\n" + index.dot + "\n"
        dot += `node_${id} -> node_${index.id}\n`

        dot += `\nnode_${id}_rcor [label="]"];\n`
        dot += `\nnode_${id} -> node_${id}_rcor\n`

        dot += `\nnode_${id}_equal [label="="];\n`
        dot += `\nnode_${id} -> node_${id}_equal\n`

        const value = this.value.ast(ast)
        dot += "\n" + value.dot + "\n"
        dot += `node_${id} -> node_${value.id}\n`
        return { dot: dot, id: id }
    }

}