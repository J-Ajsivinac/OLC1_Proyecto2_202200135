import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { Function } from "./Function";
import { errores } from "../Utils/Outs";
import { Parameter } from "../Expressions/Parameter";
import { Symbol } from "../Env/Symbol";
import { symbolTable } from "../Env/SymbolTable";

export class CallFunction extends Expression {
    constructor(line: number, column: number, public id: string, public params: Expression[]) {
        super(line, column, TypesExp.CALL);
    }
    public execute(env: Environment): ReturnType | any {
        const func: Function | null = env.getFunction(this.id);
        // console.log("Funcion", this.id, func)
        if (!func) {
            env.setErrore(this.line, this.column, `La función ${this.id} no existe`)
            return
        }

        const envFunc: Environment = new Environment(env, `Funcion ${this.id.toLowerCase()}`);
        if (func.params.length != this.params.length) {
            env.setErrore(this.line, this.column, `La función ${this.id} requiere ${func.params.length} parametros, ${this.params.length} fueron dados`)
            return
        }

        var value: ReturnType
        var param: Parameter

        for (let i = 0; i < this.params.length; i++) {
            value = this.params[i].execute(env)
            param = func.params[i]
            if (value.type === param.type) {
                if (envFunc.ids.has(param.id.toLowerCase())) {
                    env.setErrore(param.line, param.column, `El parametro ${param.id} ya existe`)
                    return
                }
                // console.log("AccessID", param.id, value.value, value.type)
                envFunc.saveId(param.id, value.value, param.type, param.line, param.column)
                symbolTable.push(param.line, param.column + 1, param.id.toLowerCase(), 'Variable', env.getTypeOf(value.type), envFunc.name)
                continue
            } else {
                env.setErrore(this.line, this.column, `El parametro ${param.id} no es del tipo ${env.getTypeOf(param.type)}`)
            }
        }

        let execute: any = func.block.execute(envFunc)

        if (execute) {
            if (execute.value === TypesExp.RETURN) {
                return
            }
            return execute
        }
    }
}