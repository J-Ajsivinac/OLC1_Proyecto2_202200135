import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export abstract class Expression {
    constructor(public line: number, public column: number, public typeExp: TypesExp) { }
    // Metodo abstracto para ejecutar la expresion
    // Este metodo debe ser implementado por las clases hijas
    // y debe retornar un objeto de tipo ReturnType
    public abstract execute(env: Environment): ReturnType;
    public abstract ast(ast: AST): ReturnAST;
}