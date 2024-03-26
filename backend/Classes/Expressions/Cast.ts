import { Expression } from "../Abstracts/Expression";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Cast extends Expression {
    constructor(line: number, column: number, public targetT: string, public exp: Expression) {
        super(line, column, TypesExp.CAST);
    }

    public execute(): ReturnType {
        let targetType = this.targetT.toLowerCase();
        switch (targetType) {
            case "int":
                return this.toInt();
            case "double":
                return this.toDouble();
            case "string":
                return this.tostring();
            case "char":
                return this.toChar();
            default:
                return { value: 'NULL', type: Types.NULL };
        }
    }

    toInt(): ReturnType {
        let val: ReturnType = this.exp.execute();
        if (val.type === Types.DOUBLE || val.type === Types.CHAR) {
            if (val.type === Types.CHAR) {
                let temp = val.value.charCodeAt(0);
                return { value: temp, type: Types.INT };
            }
            return { value: parseInt(val.value), type: Types.INT };
        }
        return { value: 'NULL', type: Types.NULL };
    }

    toDouble(): ReturnType {
        let val: ReturnType = this.exp.execute();
        if (val.type === Types.INT || val.type === Types.CHAR) {
            if (val.type === Types.CHAR) {
                let temp = val.value.charCodeAt(0);
                return { value: parseFloat(temp), type: Types.DOUBLE };
            }
            let temp = parseFloat(val.value);
            return { value: temp, type: Types.DOUBLE };
        }

        return { value: 'NULL', type: Types.NULL };
    }

    tostring(): ReturnType {
        let val: ReturnType = this.exp.execute();
        if (val.type === Types.INT || val.type === Types.DOUBLE) {
            return { value: val.value.toString(), type: Types.STRING };
        }
        return { value: 'NULL', type: Types.NULL };
    }

    toChar(): ReturnType {
        let val: ReturnType = this.exp.execute();
        if (val.type === Types.INT) {
            let temp = String.fromCharCode(val.value);
            return { value: temp, type: Types.CHAR };
        }
        return { value: 'NULL', type: Types.NULL };
    }

}