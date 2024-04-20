import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Primitive } from "../Expressions/Primitive";
import { AST, ReturnAST } from "../Utils/AST";
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
        env.reasignMatrix(this.id, index.value, index2.value, primitive)
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Asignacion Matriz"];\n`
        //Hijo 1
        const index = this.index.ast(ast)
        dot += index.dot
        dot += `node${id} -> node${index.id}\n`
        //Hijo 2
        const index2 = this.index2.ast(ast)
        dot += index2.dot
        dot += `node${id} -> node${index2.id}\n`
        //Hijo 3
        const value = this.value.ast(ast)
        dot += value.dot
        dot += `node${id} -> node${value.id}\n`
        return { dot: dot, id: id }
    }

}