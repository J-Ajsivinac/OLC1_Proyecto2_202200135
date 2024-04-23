import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { TypesInstruction } from "../Utils/TypesIns";

export class Print extends Instruction {

    constructor(line: number, column: number, private toPrint: Expression, public type: boolean) {
        super(line, column, TypesInstruction.PRINT);
    }

    public execute(env: Environment) {

        let value = this.toPrint ? this.toPrint.execute(env) : null;
        // console.log(value);
        if (this.type) {
            // console.log("ENTRO A PRINT CON ENDL")
            env.setPrint(value ? value.value + "\n" : "");
        } else {
            env.setPrint(value ? value.value : "");
        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="PRINT"];\n`
        dot += `\nnode_${id}_cout [label="cout" fillcolor="LightBlue" shape="box" style="filled" fontsize="15"]\n`
        dot += `\nnode_${id}_menor [label="<<" fillcolor="LightBlue" shape="box" style="filled" fontsize="15"]\n`

        dot += `node_${id} -> node_${id}_cout\n`
        dot += `node_${id} -> node_${id}_menor\n`
        if (this.toPrint) {
            const value = this.toPrint.ast(ast)
            dot += value.dot
            dot += `\nnode_${id} -> node_${value.id}\n`
        }
        if (this.type) {
            dot += `\nnode_${id}_menor1 [label="<<" fillcolor="LightBlue" shape="box" style="filled" fontsize="15"]\n`
            dot += `node_${id} -> node_${id}_menor1\n`
            dot += `node_${id}_endl [label="endl" fillcolor="LightBlue" shape="box" style="filled" fontsize="15"]\n`
            dot += `node_${id} -> node_${id}_endl\n`
        }
        dot += `\nnode_${id}_pc[label=";" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_pc;`
        return { dot: dot, id: id }
    }
}