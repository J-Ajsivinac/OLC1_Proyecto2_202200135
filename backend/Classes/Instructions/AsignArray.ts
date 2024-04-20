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
        var dot = `node${id} [label="Asignacion Array"];\n`
        //Hijo 1
        const index = this.index.ast(ast)
        dot += index.dot
        dot += `node${id} -> node${index.id}\n`
        //Hijo 2
        const value = this.value.ast(ast)
        dot += value.dot
        dot += `node${id} -> node${value.id}\n`
        return { dot: dot, id: id }
    }

}