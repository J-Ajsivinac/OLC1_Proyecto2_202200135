import { Environment } from '../Env/Environment';
import { AST, ReturnAST } from '../Utils/AST';
import { TypesInstruction } from '../Utils/TypesIns';
export abstract class Instruction {
    constructor(public line: number, public column: number, public typeInst: TypesInstruction) { }
    public abstract execute(env: Environment): any;
    public abstract ast(ast: AST): ReturnAST;
}