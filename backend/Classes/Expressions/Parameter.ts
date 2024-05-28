import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { TypeParam } from "../Utils/TypeParam";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";



export class Parameter extends Expression {
    public type = Types.NULL
    constructor(line: number, column: number, public id: string, public tempType: string, public typeParam: TypeParam) {
        super(line, column, TypesExp.PARAMS);
        this.type = convertToType(tempType)
    }

    public execute(env: Environment): ReturnType {
        if (this.typeParam === TypeParam.ARRAY || this.typeParam === TypeParam.MATRIX) {
            return { value: this.id, type: Types.ARRAY }
        }
        return { value: this.id, type: this.type };
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="PARAMETRO" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}_id[label="${this.id}" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}_type[label="${this.getType(this.type)}" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_type;`
        dot += `\nnode_${id} -> node_${id}_id;`
        return { dot: dot, id: id }
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