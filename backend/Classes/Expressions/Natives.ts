import { get } from "http";
import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { errores } from "../Utils/Outs";
import { Error, TypesError } from "../Utils/Error";
import { error } from "console";
import { Primitive } from "./Primitive";
import { AST, ReturnAST } from "../Utils/AST";


export class Natives extends Expression {
    constructor(line: number, column: number, private exp: Expression, private typeF: string) {
        super(line, column, TypesExp.NATIVE);
        this.typeF = typeF.toLowerCase();
    }

    public execute(env: Environment): ReturnType {
        let value: ReturnType = this.exp.execute(env);
        switch (this.typeF) {
            case 'tolower':
                return this.toLower(value);
            case 'toupper':
                return this.toUpper(value);
            case 'length':
                return this.getLenght(value);
            case 'round':
                return this.getRound(value);
            case 'typeof':
                return this.getType(value);
            case 'tostring':
                return this.getString(value);
            case 'c_str':
                return { value: this.getCStr(value.value), type: Types.ARRAY }
            default:
                return { value: 'NULL', type: Types.NULL }
        }
    }

    toLower(value: ReturnType): ReturnType {
        if (value.type === Types.STRING) {
            return { value: value.value.toLowerCase(), type: Types.STRING }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede convertir a minusculas el tipo de dato ${value.type}`));
        return { value: 'NULL', type: Types.NULL }
    }

    toUpper(value: ReturnType): ReturnType {
        if (value.type === Types.STRING) {
            return { value: value.value.toUpperCase(), type: Types.STRING }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede convertir a mayusculas el tipo de dato ${value.type}`));
        return { value: 'NULL', type: Types.NULL }
    }

    getLenght(value: ReturnType): ReturnType {
        if (value.type === Types.STRING || value.type === Types.ARRAY || Array.isArray(value)) {
            // console.log("Longitud de:", value.value)
            return { value: value.value.length, type: Types.INT }
        }
        // console.log("Longitud de:", value)
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede obtener la longitud del tipo de dato ${value.type}`));
        return { value: -1, type: Types.NULL }
    }

    getRound(value: ReturnType): ReturnType {
        if (value.type === Types.DOUBLE) {
            return { value: Math.round(value.value), type: Types.INT }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede redondear el tipo de dato ${value.type}`));
        return { value: -1, type: Types.NULL }
    }

    getType(value: ReturnType): ReturnType {
        if (value.type === Types.INT) {
            return { value: 'int', type: Types.STRING }
        }
        if (value.type === Types.DOUBLE) {
            return { value: 'double', type: Types.STRING }
        }
        if (value.type === Types.BOOLEAN) {
            return { value: 'boolean', type: Types.STRING }
        }
        if (value.type === Types.CHAR) {
            return { value: 'char', type: Types.STRING }
        }
        if (value.type === Types.STRING) {
            return { value: 'string', type: Types.STRING }
        }
        if (value.type === Types.ARRAY) {
            return { value: 'array', type: Types.STRING }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede obtener el tipo de dato ${value.type}`));
        return { value: 'null', type: Types.STRING }
    }

    getString(value: ReturnType): ReturnType {
        if (value.type === Types.INT || value.type === Types.DOUBLE || value.type === Types.BOOLEAN) {
            return { value: value.value.toString(), type: Types.STRING }
        }
        errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se puede convertir a string el tipo de dato ${value.type}`));
        return { value: 'NULL', type: Types.NULL }
    }

    getCStr(value: string) {

        // let array = value.value.split('')
        let charArray: ReturnType[] = []
        for (let character of value) {
            charArray.push({ value: character, type: Types.CHAR })
        }
        return charArray

    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="NATIVAS" color="white" fontcolor="white"]`

        dot += `\nnode_${id}_name[label="${this.typeF}" color="white" fontcolor="white"]`
        dot += `\nnode_${id}_lpars[label="(" color="white" fontcolor="white"]`
        let expAST = this.exp.ast(ast)
        dot += `\n${expAST.dot}`
        dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"]`

        if (this.typeF === 'c_str' || this.typeF === 'length') {
            dot += `\nnode_${id}_dot[label="." color="white" fontcolor="white"]`
            dot += `\nnode_${id} -> node_${expAST.id}`
            dot += `\nnode_${id} -> node_${id}_dot`
            dot += `\nnode_${id}_dot -> node_${id}_name`
            dot += `\nnode_${id}_dot -> node_${id}_rpars`
        } else {
            dot += `\nnode_${id} -> node_${id}_name`
            dot += `\nnode_${id} -> node_${id}_lpars`
            dot += `\nnode_${id} -> node_${expAST.id}`
            dot += `\nnode_${id} -> node_${id}_rpars`
        }
        return { dot: dot, id: id }
    }

}
