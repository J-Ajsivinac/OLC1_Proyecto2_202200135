import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { TypesInstruction } from "../Utils/TypesIns";
import { Case } from "./Case";

export class Switch extends Instruction {

    constructor(line: number, column: number, private exp: Expression, private cases: Case[], private defaultCase: Instruction) {
        super(line, column, TypesInstruction.SWITCH);
    }

    public execute(env: Environment) {
        const envSwitch: Environment = new Environment(env, `Switch`);
        if (this.cases) {
            let case_: Case
            let exp: ReturnType = this.exp.execute(env)
            for (case_ of this.cases) {
                case_.setCase(exp)
                let block: ReturnType = case_.execute(envSwitch)
                if (block) {
                    if (block.value === TypesExp.RETURN) return
                    else if (block.value === TypesInstruction.BREAK) return
                    return block
                }

            }
        }

        if (this.defaultCase) {
            let block: ReturnType = this.defaultCase.execute(envSwitch)
            if (block) {
                if (block.value === TypesExp.RETURN) return
                else if (block.value === TypesInstruction.BREAK) return
                return block
            }

        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID();
        var dot = `\nnode_${id} [label="SWITCH"];\n`;
        dot += `\nnode_${id}_switch [label="switch" color="white" fontcolor="white"];\n`
        dot += `\nnode_${id}_lparen[label="("]`
        dot += `\nnode_${id} -> node_${id}_switch;\n`
        dot += `node_${id} -> node_${id}_lparen;\n`

        const exp = this.exp.ast(ast);
        dot += "\n" + exp.dot + "\n";
        dot += `\nnode_${id} -> node_${exp.id}\n`;

        dot += `\nnode_${id}_rparen[label=")"]`
        dot += `\nnode_${id} -> node_${id}_rparen;`

        dot += `\nnode_${id}_lbrac [label="{"]`
        dot += `\nnode_${id} -> node_${id}_lbrac;`

        dot += `\nnode_${id}_cases [label="CASES"];\n`
        if (this.cases) {
            for (let case_ of this.cases) {
                const caseDot = case_.ast(ast);
                dot += "\n" + caseDot.dot + "\n";
                dot += `\nnode_${id}_cases -> node_${caseDot.id}\n`;
            }
        }
        if (this.defaultCase) {
            const defaultCase = this.defaultCase.ast(ast);
            dot += "\n" + defaultCase.dot + "\n";
            dot += `\nnode_${id}_cases -> node_${defaultCase.id}\n`;
        }
        dot += `\nnode_${id} -> node_${id}_cases;`
        dot += `\nnode_${id}_rbrac [label="}"]\n`
        dot += `\nnode_${id} -> node_${id}_rbrac;`

        return { dot: dot, id: id };
    }

}