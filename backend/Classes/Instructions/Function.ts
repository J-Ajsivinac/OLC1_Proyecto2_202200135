import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Parameter } from "../Expressions/Parameter";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class Function extends Instruction {
    public types = Types.NULL
    constructor(line: number, column: number, public id: string, public params: Parameter[], public block: Instruction, public tempType: string) {
        super(line, column, TypesInstruction.INIT_FUNCTION);
        this.types = convertToType(tempType)
    }
    public execute(env: Environment) {
        console.log("-Funcion-", this.id)
        env.saveFunction(this.id, this)
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="Function"];\n`
        //Hijo 1
        dot += `node${id} [label="Function"];\n`
        //Hijo 1
        dot += `node${id} [label="Function"];\n`
        //Hijo 1
        dot += `node${id} [label="Function"];\n`
        //Hijo 1
        dot += `node${id} [label="Function"];\n`
        return { dot: dot, id: id }
    }
}