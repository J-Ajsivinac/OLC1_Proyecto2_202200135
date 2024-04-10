import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { TypesInstruction } from "../Utils/TypesIns";

export class Print extends Instruction {
    constructor(line: number, column: number, private toPrint: Expression, public type: boolean) {
        super(line, column, TypesInstruction.PRINT);
    }

    public execute(env: Environment) {

        let value = this.toPrint ? this.toPrint.execute(env) : null;
        // console.log(value);
        if (this.type) {
            env.setPrint(value ? value.value + "\n" : "");
        } else {
            env.setPrint(value ? value.value : "");
        }
    }
}