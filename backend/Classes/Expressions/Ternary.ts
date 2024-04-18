import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Ternary extends Expression {
    private env!: Environment;
    constructor(line: number, column: number, public condition: Expression, public ifTrue: Expression, public ifFalse: Expression) {
        super(line, column, TypesExp.TERNARY);
    }

    public execute(env: Environment): ReturnType {
        this.env = env;
        const condition = this.condition.execute(this.env);
        if (condition.type === Types.BOOLEAN) {
            return condition.value ? this.ifTrue.execute(this.env) : this.ifFalse.execute(this.env);
        }
        return { value: 'NULL', type: Types.NULL };
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID();
        var dot = `node_${id} [label="Ternary", fillcolor="LightBlue", shape="box", style="filled", fontsize="15"]\n`;
        let condition: ReturnAST = this.condition.ast(ast);
        let ifTrue: ReturnAST = this.ifTrue.ast(ast);
        let ifFalse: ReturnAST = this.ifFalse.ast(ast);
        dot += condition.dot + '\n' + ifTrue.dot + '\n' + ifFalse.dot;
        dot += `\nnode_${id} -> node_${condition.id};\nnode_${id} -> node_${ifTrue.id};\nnode_${id} -> node_${ifFalse.id};`;
        return { dot: dot, id: id };
    }
}