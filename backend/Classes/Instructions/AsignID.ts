import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction"
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class AsignID extends Instruction {
    constructor(line: number, column: number, private id: string, private value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_ID)
    }

    public execute(env: Environment) {
        const val: ReturnType = this.value.execute(env)
        // console.log(val);
        env.reasignID(this.id, val)
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Asignacion ID"];\n`
        //Hijo 1
        const value = this.value.ast(ast)
        dot += value.dot
        dot += `node${id} -> node${value.id}\n`
        return { dot: dot, id: id }
    }

}