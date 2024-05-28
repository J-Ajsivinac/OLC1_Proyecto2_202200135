import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultValue } from "../Utils/Defaults";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class InitID extends Instruction {
    private type: Types;
    constructor(line: number, column: number, private temptype: string, private ids: string[], private value: Expression) {
        super(line, column, TypesInstruction.INIT_ID)
        // console.log(this.temptype)
        this.type = convertToType(this.temptype)
    }

    public execute(env: Environment) {
        if (this.value) {
            // console.log(this.ids, " <-> ", this.value)
            const val: ReturnType = this.value.execute(env)
            // console.log(val.type, this.type, val.value)
            if (val.type !== this.type) {
                // console.log(`Error: no se puede asignar el valor de tipo ${val.type} a la variable de tipo ${this.type}`)
                errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede asignar el valor de tipo ${val.type} a la variable de tipo ${this.type}`))
                return
            }
            for (let id of this.ids) {
                env.saveId(id, val.value, this.type, this.line, this.column)
            }

        } else {
            this.ids.forEach(id => {
                env.saveId(id, getValueDefaultValue(this.type), this.type, this.line, this.column)
            });
        }
    }

    private getType(type: Types): string {
        switch (type) {
            case Types.INT:
                return "INT"
            case Types.DOUBLE:
                return "DOUBLE"
            case Types.BOOLEAN:
                return "BOOLEAN"
            case Types.CHAR:
                return "CHAR"
            case Types.STRING:
                return "STRING"
            case Types.NULL:
                return "NULL"
            default:
                return "NULL"
        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="DECLARACION" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}_type[label="${this.getType(this.type)}" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_type;`

        // dot += `\nnode_${id}_ids[label="IDS" color="red" fontcolor="white"];`

        var dotIDs: String = ''
        let i: number = 0
        var raiz = ''
        for (let id_dec of this.ids) {
            if (i == 0) {
                dotIDs += `\nnode_${id + i}_ids[label="IDS" color="#7580f9" fontcolor="white"];`
                // raiz = id + i
                dotIDs += `\nnode_${id + i}_id[label="${id_dec}" color="#7580f9" fontcolor="white"];`
                dotIDs += `\nnode_${id + i}_ids -> node_${id + i}_id;`
            }
            else {
                dotIDs += `\nnode_${id + i}_ids[label="IDS" color="#7580f9" fontcolor="white"];`
                dotIDs += `\nnode_${id + i}_comma[label="," color="#7580f9" fontcolor="white"];`
                dotIDs += `\nnode_${id + i}_id[label="${id_dec}" color="#7580f9" fontcolor="white"];`

                dotIDs += `\nnode_${id + i}_ids -> node_${id + (i - 1)}_ids;`

                dotIDs += `\nnode_${id + i}_ids -> node_${id + i}_comma;`
                dotIDs += `\nnode_${id + i}_ids -> node_${id + i}_id;`
            }
            i++
        }
        dot += dotIDs
        dot += `\nnode_${id} -> node_${id + (i - 1)}_ids;`
        dot += `\nnode_${id}_equal[label="=" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_equal;`

        if (this.value) {
            const val: ReturnAST = this.value.ast(ast)
            dot += val.dot
            dot += `\nnode_${id} -> node_${val.id};`
        } else {
            dot += `\nnode_${id}_defult[label="${getValueDefaultValue(this.type)}" color="#7580f9" fontcolor="white"];`
            dot += `\nnode_${id} -> node_${id}_defult;`
        }
        dot += `\nnode_${id}_pc[label=";" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_pc;`
        return { dot: dot, id: id }
    }
}