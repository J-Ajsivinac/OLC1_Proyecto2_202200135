import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class InitID extends Instruction {
    private type: Types;
    constructor(line: number, column: number, private temptype: string, private ids: string[], private value: Expression) {
        super(line, column, TypesInstruction.INIT_ID)
        this.type = this.convertToType(this.temptype)
    }

    public execute(env: Environment) {
        if (this.value) {
            const val: ReturnType = this.value.execute(env)

            if (val.type !== this.type) {
                console.log(`Error: no se puede asignar el valor de tipo ${val.type} a la variable de tipo ${this.type}`)
                return
            }
            for (let id of this.ids) {
                env.saveId(id, val.value, this.type, this.line, this.column)
            }

        } else {
            this.ids.forEach(id => {
                switch (this.type) {
                    case Types.INT:
                        env.saveId(id, 0, this.type, this.line, this.column)
                        break
                    case Types.DOUBLE:
                        env.saveId(id, 0.0, this.type, this.line, this.column)
                        break
                    case Types.BOOLEAN:
                        env.saveId(id, true, this.type, this.line, this.column)
                        break
                    case Types.CHAR:
                        env.saveId(id, '0', this.type, this.line, this.column)
                        break
                    case Types.STRING:
                        env.saveId(id, "", this.type, this.line, this.column)
                        break
                }
            });
        }
    }

    convertToType(type: String): Types {
        type = type.toLowerCase();
        if (type === 'int') {
            return Types.INT
        }
        if (type === 'double') {
            return Types.DOUBLE
        }
        if (type === 'boolean') {
            return Types.BOOLEAN
        }
        if (type === 'char') {
            return Types.CHAR
        }
        if (type === 'String') {
            return Types.STRING
        }
        return Types.NULL
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
}