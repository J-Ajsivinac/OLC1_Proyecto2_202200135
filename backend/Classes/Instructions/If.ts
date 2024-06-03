import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Return } from "../Expressions/Return";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";
import { Block } from "./Block";

export class If extends Instruction {

    constructor(line: number, column: number, private condition: any, private block: Instruction, private elseBlock: Instruction | null) {
        super(line, column, TypesInstruction.IF);
    }

    public execute(env: Environment) {
        let condition: ReturnType = this.condition.execute(env);
        if (condition.value) {
            let block: ReturnType = this.block.execute(env);
            if (block) {
                return block;
            }
            return
        }
        if (this.elseBlock) {
            let elseBlock: ReturnType = this.elseBlock.execute(env);
            if (elseBlock) {
                return elseBlock;
            }
        }
    }

    public getReturns(): Return[] {
        let returns: Return[] = []
        let block: Block = this.block as Block
        returns = block.getReturns()
        if (this.elseBlock) {
            let elseBlock: Block = this.elseBlock as Block
            returns = returns.concat(elseBlock.getReturns())
        }
        return returns
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="IF" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_cnd[label="CONDICION" color="white" fontcolor="white"];`
        let cond: ReturnAST = this.condition.ast(ast)
        dot += '\n' + cond.dot
        let inst: ReturnAST = this.block.ast(ast)
        dot += '\n' + inst.dot
        dot += `\nnode_${id} -> node_${id}_cnd;`
        dot += `\nnode_${id}_cnd -> node_${cond.id};`
        dot += `\nnode_${id} -> node_${inst.id};`
        if (this.elseBlock) {
            let except: ReturnAST = this.elseBlock.ast(ast)
            dot += `\nnode_${id}_else[label="ELSE" color="white" fontcolor="white"];`
            dot += `\nnode_${id} -> node_${id}_else;`
            dot += '\n' + except.dot
            dot += `\nnode_${id}_else -> node_${except.id};`
        }
        return { dot: dot, id: id }
    }

}