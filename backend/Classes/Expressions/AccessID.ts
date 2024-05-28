import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { Symbol } from "../Env/Symbol";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class AccessID extends Expression {
    private type: Types = Types.NULL
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypesExp.ACCESS_ID);
    }

    public execute(env: Environment): ReturnType {
        const value: Symbol | null = env.getValue(this.id);
        if (!value) {
            // console.log("AccessID", this.id, value)
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se encontro el valor de ${this.id}`))
            return { value: 'NULL', type: Types.NULL }
        }
        if (value.type === Types.ARRAY) {
            this.type = Types.STRING
            return { value: value.value, type: this.type }
        }
        this.type = value.type
        // console.log("AccessID CLASS", this.id, value.value, value.type)
        return { value: value.value, type: this.type };
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `\nnode_${id}[label="ACCESS_ID" color="#7580f9" fontcolor="white"];`
        dot += `\nnode_${id}_id[label="${this.id}" color="white" fontcolor="white"];`
        dot += `\nnode_${id} -> node_${id}_id;`
        return { dot: dot, id: id }
    }
}