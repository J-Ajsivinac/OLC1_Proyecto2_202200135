import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class Continue extends Instruction {
    constructor(line: number, column: number) {
        super(line, column, TypesInstruction.CONTINUE);
    }

    public execute(env: Environment): ReturnType {
        return { value: this.typeInst, type: Types.NULL }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Continue"];\n`
        return { dot: dot, id: id }
    }
}