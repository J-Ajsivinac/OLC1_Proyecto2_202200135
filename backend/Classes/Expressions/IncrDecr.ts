import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { Symbol } from "../Env/Symbol";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
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
                if (value.type !== Types.INT && value.type !== Types.DOUBLE) {
                    errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede incrementar un valor de tipo ${value.type}`))
                    return { value: value.value, type: value.type }
                }
                value.value++
                break
            case '--':
                if (value.type !== Types.INT && value.type !== Types.DOUBLE) {
                    errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede decrementar un valor de tipo ${value.type}`))
                    return { value: value.value, type: value.type }
                }
                value.value--
                break
        }

        let resp = env.reasignID(this.id, { value: value.value, type: value.type })
        if (!resp) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede reasignar el valor de ${this.id} de tipo ${value.type} a ${value.value}`))
        }
        return { value: value?.value, type: value.type }
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