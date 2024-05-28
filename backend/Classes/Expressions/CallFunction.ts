import { Expression } from "../Abstracts/Expression";
import { Environment } from "../Env/Environment";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { Function } from "../Instructions/Function";
import { errores } from "../Utils/Outs";
import { Parameter } from "./Parameter";
import { Symbol } from "../Env/Symbol";
import { symbolTable } from "../Env/SymbolTable";
import { AST, ReturnAST } from "../Utils/AST";
import { TypeParam } from "../Utils/TypeParam";

export class CallFunction extends Expression {
    constructor(line: number, column: number, public id: string, public params: Expression[]) {
        super(line, column, TypesExp.CALL);
    }
    public execute(env: Environment): ReturnType | any {
        const func: Function | null = env.getFunction(this.id);
        if (!func) {
            env.setErrore(this.line, this.column, `La función ${this.id} no existe en este contexto`)
            return
        }

        let isFunction: boolean = func.types === Types.NULL ? false : true

        const envFunc: Environment = new Environment(env, `Funcion ${this.id.toLowerCase()}`);
        if (func.params.length != this.params.length) {
            env.setErrore(this.line, this.column, `La función ${this.id} requiere ${func.params.length} parametros, ${this.params.length} fueron dados`)
            return
        }

        let validateArray: Parameter

        for (let i = 0; i < func.params.length; i++) {
            const value: ReturnType = this.params[i].execute(env)
            const param: ReturnType = func.params[i].execute(env)
            validateArray = func.params[i]
            var tempTyp = value.type
            if (value.type === param.type || ((validateArray.typeParam === TypeParam.ARRAY || validateArray.typeParam === TypeParam.MATRIX) && value.type === Types.STRING)) {
                if (envFunc.ids.has(func.params[i].id.toLowerCase())) {
                    env.setErrore(validateArray.line, validateArray.column, `El parametro ${validateArray.id} ya existe`)
                    return
                }
                if (validateArray.typeParam === TypeParam.ARRAY || validateArray.typeParam === TypeParam.MATRIX) {
                    if (value.type !== Types.STRING) {
                        env.setErrore(validateArray.line, validateArray.column, `El parametro ${validateArray.id} no es del tipo ARRAY o MATRIX`)
                        return
                    }
                    envFunc.saveArray(validateArray.id, tempTyp, value.value, validateArray.line, validateArray.column)
                    symbolTable.push(validateArray.line, validateArray.column + 1, validateArray.id.toLowerCase(), 'Variable', env.getTypeOf(value.type), envFunc.name)
                    continue
                } else {
                    envFunc.saveId(param.value, value.value, value.type, func.params[i].line, func.params[i].column)                    // envFunc.saveId(param.id, value.value, param.type, param.line, param.column)
                    symbolTable.push(func.params[i].line, func.params[i].column + 1, func.params[i].id.toLowerCase(), 'Variable', env.getTypeOf(value.type), envFunc.name)
                    continue
                }
            }
            else {
                envFunc.setErrore(this.line, this.column, `El parametro ${param.value} no es del tipo ${env.getTypeOf(param.type)}`)
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

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id}[label="CALL FUNC" color="white" fontcolor="white"]`
        dot += `\nnode_${id}_name[label="${this.id}" color="white" fontcolor="white"]`
        dot += `\nnode_${id}_lpars[label="(" color="white" fontcolor="white"]`

        dot += `\nnode_${id} -> node_${id}_name`
        dot += `\nnode_${id} -> node_${id}_lpars`

        // dot += `node${id}_params [label="PARAMETROS"];\n`
        let i: number = 0
        this.params.forEach((param: Expression) => {
            const p = param.ast(ast)
            if (i == 0) {
                dot += `\nnode_${id}_${i}_params[label="PARAMETROS" color="white" fontcolor="white"]`
                dot += p.dot
                dot += `\nnode_${id}_${i}_params -> node_${p.id}`
            } else {
                dot += `\nnode_${id}_${i}_params[label="PARAMETROS" color="white" fontcolor="white"]`
                dot += `\nnode_${id}_${i}_comma[label="," color="white" fontcolor="white"]`
                dot += p.dot
                // Conectando nodos
                dot += `\nnode_${id}_${i}_params -> node_${id}_${i - 1}_params\n`
                dot += `\nnode_${id}_${i}_params -> node_${id}_${i}_comma\n`
                dot += `\nnode_${id}_${i}_params -> node_${p.id}\n`
            }
            i++;
        });
        // dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"]`
        if (this.params.length > 0) {
            dot += `\nnode_${id} -> node_${id}_${i - 1}_params`
        }
        dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"]`
        dot += `\nnode_${id} -> node_${id}_rpars`
        return { dot: dot, id: id }
    }
}