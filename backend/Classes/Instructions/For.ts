import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class For extends Instruction {
    constructor(line: number, column: number, private init: Instruction, private condition: Instruction, private increment: Instruction, private block: Instruction) {
        super(line, column, TypesInstruction.LOOP_FOR)
    }

    public execute(env: Environment) {
        // console.log(this.init)
        const forEnv = new Environment(env, `${env.name} for`)
        this.init.execute(forEnv)
        let condition: ReturnType = this.condition.execute(forEnv)
        // console.log(condition)
        while (condition.value) {
            // console.log(this.block)
            let block: any = this.block.execute(forEnv)
            if (block) {
                if (block.value == TypesInstruction.BREAK) {
                    break
                } else if (block.value == TypesInstruction.CONTINUE) {
                    this.increment.execute(forEnv)
                    condition = this.condition.execute(forEnv)
                    continue
                }
                return block
            }
            this.increment.execute(forEnv)
            condition = this.condition.execute(forEnv)
        }
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="FOR"];\n`
        dot += `\nnode_${id}_lim[label="Rango" color="red"]`
        let limInferior: ReturnAST = this.init.ast(ast)
        let limSuperior: ReturnAST = this.condition.ast(ast)
        let limIncremento: ReturnAST = this.increment.ast(ast)
        dot += "\n" + limInferior.dot
        dot += "\n" + limSuperior.dot
        dot += "\n" + limIncremento.dot
        dot += `\nnode_${id}_lim -> node_${limInferior.id};`
        dot += `\nnode_${id}_lim -> node_${limSuperior.id};`
        dot += `\nnode_${id}_lim -> node_${limIncremento.id};`

        let instructions: ReturnAST = this.block.ast(ast)
        dot += "\n" + instructions.dot
        dot += `\nnode_${id} -> node_${instructions.id};`
        dot += `\nnode_${id} -> node_${id}_lim;`
        return { dot: dot, id: id }
    }
}