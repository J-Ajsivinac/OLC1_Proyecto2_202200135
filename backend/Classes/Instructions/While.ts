import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Return } from "../Expressions/Return";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";
import { Block } from "./Block";

export class While extends Instruction {

    constructor(line: number, column: number, private condition: any, private block: Instruction) {
        super(line, column, TypesInstruction.LOOP_WHILE)
    }

    public execute(env: Environment) {
        const whileEnv = new Environment(env, `${env.name} while`)
        let condition: ReturnType | null = this.condition.execute(whileEnv)
        while (condition?.value) {
            let block: ReturnType = this.block.execute(whileEnv)
            if (block) {
                if (block.value == TypesInstruction.BREAK) {
                    break
                } else if (block.value == TypesInstruction.CONTINUE) {
                    condition = this.condition.execute(whileEnv)
                    continue
                }
                return block
            }
            condition = this.condition.execute(whileEnv)
        }
    }

    public getReturns(): Return[] {
        let returns: Return[] = []
        let block: Block = this.block as Block
        returns = block.getReturns()
        return returns
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="WHILE" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_cond[label="CONDICION" color="white" fontcolor="white"]`
        let cond: ReturnAST = this.condition.ast(ast)
        dot += '\n' + cond.dot
        dot += `\nnode_${id}_cond -> node_${cond.id};`
        let inst: ReturnAST = this.block.ast(ast)
        dot += '\n' + inst.dot
        dot += `\nnode_${id} -> node_${inst.id};`
        dot += `\nnode_${id} -> node_${id}_cond;`
        return { dot: dot, id: id }
    }
}