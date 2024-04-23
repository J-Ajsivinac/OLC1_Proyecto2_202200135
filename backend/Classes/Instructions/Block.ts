import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { IncrDecr } from "../Expressions/IncrDecr";
import { AST, ReturnAST } from "../Utils/AST";
import { TypesInstruction } from "../Utils/TypesIns";

export class Block extends Instruction {
    constructor(line: number, column: number, private instructions: Instruction[]) {
        super(line, column, TypesInstruction.BLOCK)
    }

    public execute(env: Environment): any {
        const blockEnv = new Environment(env, `${env.name} block`)
        for (let instruction of this.instructions) {
            try {
                const ret = instruction.execute(blockEnv)
                if (ret && !(instruction instanceof IncrDecr)) {
                    return ret
                }
            } catch (error) { }
        }
    }


    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="BLOCK" color="white" fontcolor="white"];`
        let value1: ReturnAST
        dot += `node_${id}_lcorch[label="{" color="white" fontcolor="white"];`
        dot += `node_${id} -> node_${id}_lcorch;`
        for (let i = 0; i < this.instructions.length; i++) {
            value1 = this.instructions[i].ast(ast)
            dot += '\n' + value1.dot
            dot += `\nnode_${id} -> node_${value1.id};`
        }
        dot += `node_${id}_rcorch[label="}" color="white" fontcolor="white"];`
        dot += `node_${id} -> node_${id}_rcorch;`
        return { dot: dot, id: id }
    }
}