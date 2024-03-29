import { Environment } from '../Env/Environment';
import { TypesInstruction } from '../Utils/TypesIns';
export abstract class Instruction {
    constructor(public line: number, public column: number, public typeInst: TypesInstruction) { }
    public abstract execute(env: Environment): any;
}