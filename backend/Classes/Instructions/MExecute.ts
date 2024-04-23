import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { TypesInstruction } from "../Utils/TypesIns";

export class MExecute extends Instruction {
    constructor(line: number, column: number, private callF: Expression) {
        super(line, column, TypesInstruction.EXECUTE)
    }

    public execute(env: Environment) {
        this.callF.execute(env)
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="EXECUTE"];\n`
        const call = this.callF.ast(ast)
        dot += call.dot
        dot += `node_${id} -> node_${call.id}\n`
        return { dot: dot, id: id }
    }
}