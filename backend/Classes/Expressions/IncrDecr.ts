import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { Symbol } from "../Env/Symbol";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class IncrDecr extends Expression {
    constructor(line: number, column: number, private id: string, private sign: string) {
        super(line, column, sign === '++' ? TypesExp.INC : TypesExp.DEC);
    }

    public execute(env: Environment): ReturnType {
        let value: Symbol | null = env.getValue(this.id)
        if (!value) {
            return { value: null, type: Types.NULL }
        }

        switch (this.sign) {
            case '++':
                value.value++
                break
            case '--':
                value.value--
                break
        }

        env.reasignID(this.id, { value: value.value, type: Types.INT })
        return { value: value?.value, type: Types.INT }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        // var dot = `node_${id}[label="${this.sign}" color="white" fontcolor="white"];`
        var dot = `\nnode_${id}[label="INCRE_AND_DECRE" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}id[label="${this.id}" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}sign[label="${this.sign}" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}id;`
        dot += `\nnode_${id} -> node_${id}sign;`
        return { dot: dot, id: id }
    }
}