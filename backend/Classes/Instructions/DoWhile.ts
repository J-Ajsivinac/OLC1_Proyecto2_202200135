import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Return } from "../Expressions/Return";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";
import { Block } from "./Block";

export class DoWhile extends Instruction {
    constructor(line: number, column: number, private condition: Instruction, private block: Instruction) {
        super(line, column, TypesInstruction.LOOP_DO_WHILE);
    }

    public execute(env: Environment) {
        let condition: ReturnType | null = null;
        const doWhileEnv = new Environment(env, `${env.name} do while`);
        do {
            const block: ReturnType = this.block.execute(env);
            if (block) {
                if (block.value === TypesInstruction.CONTINUE) {
                    condition = this.condition.execute(doWhileEnv);
                    continue;
                } else if (block.value === TypesInstruction.BREAK) {
                    break;
                }
                return block
            }
            condition = this.condition.execute(doWhileEnv);
        } while (condition?.value);
    }

    public getReturns(): Return[] {
        let returns: Return[] = [];
        let block: Block = this.block as Block;
        returns = block.getReturns();
        return returns;
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID();
        var dot = `node_${id} [label="DO_WHILE"];\n`;
        dot += `\nnode_${id}_do[label="do" color="white" fontcolor="white"];\n`
        dot += `node_${id} -> node_${id}_do;\n`
        var bloc = this.block.ast(ast);
        var cond = this.condition.ast(ast);
        dot += "\n" + bloc.dot + "\n";
        dot += `node_${id} -> node_${bloc.id};\n`;
        dot += `\nnode_${id}_while[label="while" color="white" fontcolor="white"];\n`
        dot += `node_${id} -> node_${id}_while;\n`
        dot += `\nnode_${id}_lparen[label="(" color="white" fontcolor="white"];\n`
        dot += `node_${id} -> node_${id}_lparen;\n`
        dot += "\n" + cond.dot + "\n";
        dot += `node_${id} -> node_${cond.id};\n`;
        dot += `\nnode_${id}_rparen[label=")" color="white" fontcolor="white"];\n`
        dot += `node_${id} -> node_${id}_rparen;\n`

        return { dot: dot, id: id };
    }
}