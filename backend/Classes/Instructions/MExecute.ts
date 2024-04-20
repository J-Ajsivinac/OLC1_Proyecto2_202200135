import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { TypesInstruction } from "../Utils/TypesIns";

export class MExecute extends Instruction {
    constructor(line: number, column: number, private CallF: Expression) {
        super(line, column, TypesInstruction.EXECUTE)
    }

    public execute(env: Environment) {
        this.CallF.execute(env)
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Execute"];\n`
        const call = this.CallF.ast(ast)
        dot += call.dot
        dot += `node${id} -> node${call.id}\n`
        return { dot: dot, id: id }
    }
}