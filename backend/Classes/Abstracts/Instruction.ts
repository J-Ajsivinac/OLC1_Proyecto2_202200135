import { TypesInstruction } from '../Utils/TypesIns';
export abstract class Instruction {
    constructor(public line: number, public column: number, public typeInst: TypesInstruction) { }
    public abstract execute(): any;
}