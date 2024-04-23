import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypeError } from "../Utils/TypesError";
import { TypesExp } from "../Utils/TypesExp";

export class Cast extends Expression {
    private env!: Environment;
    constructor(line: number, column: number, public targetT: string, public exp: Expression) {
        super(line, column, TypesExp.CAST);
    }

    public execute(env: Environment): ReturnType {
        this.env = env;
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
                errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede castear a ${targetType}`));
                return { value: 'NULL', type: Types.NULL };
        }
    }

    toInt(): ReturnType {
        let val: ReturnType = this.exp.execute(this.env);
        if (val.type === Types.DOUBLE || val.type === Types.CHAR) {
            if (val.type === Types.CHAR) {
                let temp = val.value.charCodeAt(0);
                return { value: temp, type: Types.INT };
            }
            return { value: parseInt(val.value), type: Types.INT };
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede castear a int el tipo ${val.type}`));
        return { value: 'NULL', type: Types.NULL };
    }

    toDouble(): ReturnType {
        let val: ReturnType = this.exp.execute(this.env);
        if (val.type === Types.INT || val.type === Types.CHAR) {
            if (val.type === Types.CHAR) {
                let temp = val.value.charCodeAt(0);
                return { value: parseFloat(temp), type: Types.DOUBLE };
            }
            let temp = parseFloat(val.value);
            return { value: temp, type: Types.DOUBLE };
        }

        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede castear a double el tipo ${val.type}`));
        return { value: 'NULL', type: Types.NULL };
    }

    tostring(): ReturnType {
        let val: ReturnType = this.exp.execute(this.env);
        if (val.type === Types.INT || val.type === Types.DOUBLE) {
            return { value: val.value.toString(), type: Types.STRING };
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede castear a string el tipo ${val.type}`));
        return { value: 'NULL', type: Types.NULL };
    }

    toChar(): ReturnType {
        let val: ReturnType = this.exp.execute(this.env);
        if (val.type === Types.INT) {
            let temp = String.fromCharCode(val.value);
            return { value: temp, type: Types.CHAR };
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede castear a char el tipo ${val.type}`));
        return { value: 'NULL', type: Types.NULL };
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="CAST" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_lpars[label="(" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_type[label="${this.targetT.toLowerCase()}" color="white" fontcolor="white"];`
        dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"];`

        let value1: ReturnAST = this.exp.ast(ast)
        dot += '\n' + value1.dot

        dot += `\nnode_${id} -> node_${id}_lpars;`
        dot += `\nnode_${id} -> node_${id}_type;`
        dot += `\nnode_${id} -> node_${id}_rpars;`
        dot += `\nnode_${id} -> node_${value1.id};`
        // dot += `\nnode_${id} -> node_${id}_type;`
        return { dot: dot, id: id }
    }

}