import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultValue } from "../Utils/Defaults";
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
            const val: ReturnType = this.value.execute(env)
            // console.log(val.type, this.type, val.value)
            if (val.type !== this.type) {
                console.log(`Error: no se puede asignar el valor de tipo ${val.type} a la variable de tipo ${this.type}`)
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
        var dot = `node${id} [label="InitID"];\n`
        //Hijo 1
        dot += `node${id} [label="InitID"];\n`
        //Hijo 1
        dot += `node${id} [label="InitID"];\n`
        //Hijo 1
        dot += `node${id} [label="InitID"];\n`
        //Hijo 1
        dot += `node${id} [label="InitID"];\n`
        return { dot: dot, id: id }
    }
}