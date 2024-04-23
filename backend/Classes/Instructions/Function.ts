import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Parameter } from "../Expressions/Parameter";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class Function extends Instruction {
    public types = Types.NULL
    constructor(line: number, column: number, public id: string, public params: Parameter[], public block: Instruction, public tempType: string) {
        super(line, column, TypesInstruction.INIT_FUNCTION);
        this.types = convertToType(tempType)
    }
    public execute(env: Environment) {
        // console.log("-Funcion-", this.id)
        env.saveFunction(this.id, this)
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="FUNCTION" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_name[label="${this.id}" color="white" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_name;`
        if (this.params.length > 0) {
            dot += `\nnode_${id}_params[label="PARAMS" color="white" fontcolor="white"];`
            for (let i = 0; i < this.params.length; i++) {
                dot += `\nnode_${id}_param_${i}[label="${this.params[i].id}" color="white" fontcolor="white"];`
                dot += `\nnode_${id}_params -> node_${id}_param_${i};`
            }
            dot += `\nnode_${id}_name -> node_${id}_params;`
        }
        let inst: ReturnAST = this.block.ast(ast)
        dot += '\n' + inst.dot
        dot += `\nnode_${id}_name -> node_${inst.id};`
        return { dot: dot, id: id }
    }
}