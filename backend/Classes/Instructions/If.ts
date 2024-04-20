import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

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

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID();
        var dot = `node${id} [label="If"];\n`;
        //Hijo 1
        const condition = this.condition.ast(ast);
        dot += condition.dot;
        dot += `node${id} -> node${condition.id}\n`;
        //Hijo 2
        const block = this.block.ast(ast);
        dot += block.dot;
        dot += `node${id} -> node${block.id}\n`;
        if (this.elseBlock) {
            //Hijo 3
            const elseBlock = this.elseBlock.ast(ast);
            dot += elseBlock.dot;
            dot += `node${id} -> node${elseBlock.id}\n`;
        }
        return { dot: dot, id: id };
    }

}