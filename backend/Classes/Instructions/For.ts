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
            // console.log(condition.value)
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
        var dot = `node${id} [label="For"];\n`
        const init = this.init.ast(ast)
        dot += init.dot
        dot += `node${id} -> node${init.id}\n`
        const condition = this.condition.ast(ast)
        dot += condition.dot
        dot += `node${id} -> node${condition.id}\n`
        const increment = this.increment.ast(ast)
        dot += increment.dot
        dot += `node${id} -> node${increment.id}\n`
        const block = this.block.ast(ast)
        dot += block.dot
        dot += `node${id} -> node${block.id}\n`
        return {
            dot: dot, id: id
        }
    }
}