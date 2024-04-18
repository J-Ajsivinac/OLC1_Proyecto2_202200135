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
        var dot = `node_${id}[label="${this.sign}" color="white" fontcolor="white"];`
        return { dot: dot, id: id }
    }
}