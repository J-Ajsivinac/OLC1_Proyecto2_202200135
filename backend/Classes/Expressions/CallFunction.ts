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

        var value: ReturnType
        var param: Parameter
        // console.log("size", this.params.length, func.params.length)
        for (let i = 0; i < this.params.length; i++) {
            value = this.params[i].execute(env)
            param = func.params[i]

            var tempTyp = value.type

            if (value.type === param.type || (param.isArray && value.type === Types.STRING)) {
                if (envFunc.ids.has(param.id.toLowerCase())) {
                    env.setErrore(param.line, param.column, `El parametro ${param.id} ya existe`)
                    return
                }

                if (param.isArray && value.type === Types.STRING) {
                    // console.log("SE HA GUARDADO LA VARIABLE", param.id, tempTyp, value.value, param.line, param.column)
                    env.saveArray(param.id, tempTyp, value.value, param.line, param.column)
                    symbolTable.push(param.line, param.column + 1, param.id.toLowerCase(), 'Variable', env.getTypeOf(value.type), envFunc.name)
                    continue
                } else {
                    // console.log("AccessID", param.id, value.value, value.type)
                    envFunc.saveId(param.id, value.value, param.type, param.line, param.column)
                    symbolTable.push(param.line, param.column + 1, param.id.toLowerCase(), 'Variable', env.getTypeOf(value.type), envFunc.name)
                    continue
                }
            } else {
                env.setErrore(this.line, this.column, `El parametro ${param.id} no es del tipo ${env.getTypeOf(param.type)}`)
            }
        }
        let execute: any = func.block.execute(envFunc)
        // console.log("Execute", execute)
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
                dot += `\nnode_${id + i}_params[label="PARAMETROS" color="white" fontcolor="white"]`
                dot += p.dot
                dot += `\nnode_${id + i}_params -> node_${p.id}`
            } else {
                dot += `\nnode_${id + i}_params[label="PARAMETROS" color="white" fontcolor="white"]`
                dot += `\nnode_${id + i}_comma[label="," color="white" fontcolor="white"]`
                dot += p.dot
                // Conectando nodos
                dot += `\nnode_${id + 1}_params -> node_${id + (i - 1)}_params\n`
                dot += `\nnode_${id + 1}_params -> node_${id + i}_comma\n`
                dot += `\nnode_${id + 1}_params -> node_${p.id}\n`
            }
            i++;
        });
        // dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"]`
        if(this.params.length > 0){
            dot += `\nnode_${id} -> node_${id + (i - 1)}_params`
        }
        dot += `\nnode_${id}_rpars[label=")" color="white" fontcolor="white"]`
        dot += `\nnode_${id} -> node_${id}_rpars`
        return { dot: dot, id: id }
    }
}