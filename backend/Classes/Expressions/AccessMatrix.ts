import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { Symbol } from "../Env/Symbol";
import { AST, ReturnAST } from "../Utils/AST";
import { Error, TypesError } from "../Utils/Error";
import { errores } from "../Utils/Outs";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class AccessMatrix extends Expression {
    public types: Types = Types.NULL
    constructor(line: number, column: number, public id: string, public index: Expression, public index2: Expression) {
        super(line, column, TypesExp.ACCESS_MATRIX);
    }

    public execute(env: Environment): ReturnType {
        let index: ReturnType = this.index.execute(env)
        let index2: ReturnType = this.index2.execute(env)
        const value: Symbol | null = env.getValueMatrix(this.id, index.value, index2.value)
        if (!value) {
            errores.push(new Error(this.line, this.column, TypesError.SEMANTICO, `No se encontro el valor en el arreglo ${this.id} en la posicion ${index.value}`))
            console.log(`Error: No se encontro el valor en el arreglo ${this.id} en la posicion ${index.value}`)
            return { value: 'NULL', type: 0 }
        }
        this.types = value.type
        return {
            value: value.value, type: this.types
        }
    }

    public ast(ast: AST): ReturnAST {
        return { dot: '', id: 0 };
    }


}