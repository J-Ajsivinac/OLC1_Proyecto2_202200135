import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Return extends Expression {
    private type: Types = Types.NULL;
    constructor(line: number, column: number, public value: Expression) {
        super(line, column, TypesExp.RETURN);
    }
    public execute(env: Environment): ReturnType {
        if (this.value) {
            let value: ReturnType = this.value.execute(env);
            this.type = value.type;
            return { value: value.value, type: this.type };
        }
        return { value: this.typeExp, type: this.type }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="Return", fillcolor="LightBlue", shape="box", style="filled", fontsize="15"]\n`
        if (this.value) {
            let value1: ReturnAST = this.value.ast(ast)
            dot += '\n' + value1.dot
            dot += `\nnode_${id} -> node_${value1.id};`
        }
        return { dot: dot, id: id }
    }
}