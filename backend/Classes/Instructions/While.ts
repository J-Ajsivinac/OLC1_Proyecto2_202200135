import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

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

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="While"];\n`
        //Hijo 1
        const condition = this.condition.ast(ast)
        dot += condition.dot
        dot += `node${id} -> node${condition.id}\n`
        //Hijo 2
        const block = this.block.ast(ast)
        dot += block.dot
        dot += `node${id} -> node${block.id}\n`
        return { dot: dot, id: id }
    }
}