import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Parameter extends Expression {
    public type = Types.NULL
    constructor(line: number, column: number, public id: string, public tempType: string, public isArray: boolean = false) {
        super(line, column, TypesExp.PARAMS);
        this.type = convertToType(tempType)
    }

    public execute(env: Environment): ReturnType {
        return { value: this.id, type: this.type };
    }

    public ast(ast: AST): ReturnAST {
        throw new Error("Method not implemented.");
    }
}