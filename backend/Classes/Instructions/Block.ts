import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { CallFunction } from "../Expressions/CallFunction";
import { IncrDecr } from "../Expressions/IncrDecr";
import { Primitive } from "../Expressions/Primitive";
import { Return } from "../Expressions/Return";
import { AST, ReturnAST } from "../Utils/AST";
import { getValueDefaultValue } from "../Utils/Defaults";
import { TypesInstruction } from "../Utils/TypesIns";
import { DoWhile } from "./DoWhile";
import { For } from "./For";
import { Function } from "./Function";
import { If } from "./If";
import { Switch } from "./Switch";
import { While } from "./While";

export class Block extends Instruction {
    constructor(line: number, column: number, public instructions: Instruction[]) {
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

    public getReturns(): Return[] {
        let returns: Return[] = []
        for (let instruction of this.instructions) {
            if (instruction instanceof Return) {
                returns.push(instruction)
            } else if (instruction instanceof Block) {
                returns = returns.concat(instruction.getReturns())
            } else if (instruction instanceof If) {
                returns = returns.concat(instruction.getReturns())
            } else if (instruction instanceof For) {
                returns = returns.concat(instruction.getReturns())
            } else if (instruction instanceof While) {
                returns = returns.concat(instruction.getReturns())
            } else if (instruction instanceof DoWhile) {
                returns = returns.concat(instruction.getReturns())
            } else if (instruction instanceof Switch) {
                returns = returns.concat(instruction.getReturns())
            }
        }
        return returns
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