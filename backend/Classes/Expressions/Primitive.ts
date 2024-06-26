import { Expression } from "../Abstracts/Expression";
import { AST, ReturnAST } from "../Utils/AST";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class Primitive extends Expression {
    constructor(line: number, column: number, public value: any, public typeValue: Types) {
        super(line, column, TypesExp.PRIMITIVE);
    }
    public execute(): ReturnType {
        switch (this.typeValue) {
            case Types.INT:
                return { value: parseInt(this.value), type: this.typeValue }
            case Types.DOUBLE:
                return { value: parseFloat(this.value), type: this.typeValue }
            case Types.BOOLEAN:
                return { value: this.value.toString().toLowerCase() === 'true', type: this.typeValue }
            case Types.CHAR:
                this.value = this.value.replace(/\\n/g, '\n')
                this.value = this.value.replace(/\\t/g, '\t')
                this.value = this.value.replace(/\\r/g, '\r')
                this.value = this.value.replace(/\\"/g, '\"')
                this.value = this.value.replace(/\\'/g, '\'')
                this.value = this.value.replace(/\\\\/g, '\\')
                return { value: this.value, type: this.typeValue }
            default:
                this.value = this.value.replace(/\\n/g, '\n')
                this.value = this.value.replace(/\\t/g, '\t')
                this.value = this.value.replace(/\\r/g, '\r')
                this.value = this.value.replace(/\\"/g, '\"')
                this.value = this.value.replace(/\\'/g, '\'')
                this.value = this.value.replace(/\\\\/g, '\\')
                return { value: this.value, type: this.typeValue }
        }
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="PRIMITIVO" color="white" fontcolor="white"]`
        dot += `\nnode_${id}_value [label="${this.value}" fontcolor="white" color="white"]\n`
        dot += `node_${id} -> node_${id}_value`
        return { dot: dot, id: id }
    }
}