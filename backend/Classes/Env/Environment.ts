import { ReturnType, Types } from "../Utils/Types";
import { Symbol } from "./Symbol";
import { symbolTable } from "./SymbolTable";
import { errores, printConsole } from "../Utils/Outs";
import { Function } from "../Instructions/Function";
import { error } from "console";
import { Error, TypesError } from "../Utils/Error";
import { Primitive } from "../Expressions/Primitive";
export class Environment {
    public ids: Map<string, Symbol> = new Map<string, Symbol>();
    public functions: Map<string, Function> = new Map<string, Function>();
    constructor(private prev: Environment | null, public name: string) { }

    public saveId(id: string, value: any, type: Types, line: number, column: number) {
        let env: Environment = this;
        if (!env.ids.has(id)) {
            env.ids.set(id.toLowerCase(), new Symbol(value, id, type, undefined));
            symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
        } else {
            errores.push(new Error(line, column, TypesError.SEMANTICO, `Variable ${id} ya existe en el entorno actual`))
        }

    }

    public getValue(id: string): Symbol | null {
        let env: Environment | null = this;
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                // console.log(id.toLowerCase(), env.ids.get(id.toLowerCase()))
                return env.ids.get(id.toLowerCase()) as Symbol;
            }
            env = env.prev;
        }
        return null
    }

    public reasignID(id: string, value: ReturnType): boolean {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                if (symbol.type !== value.type) {
                    // this.setErrore(, , `Variable ${id} no es de tipo ${this.getTypeOf(value.value)}`)
                    // console.log(`Error: Variable ${id} no es de tipo ${this.getTypeOf(value.typeValue)}`)
                    return false
                }
                symbol.value = value.value
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.prev
        }
        // console.log(`Error: Variable ${id} no encontrada`)
        return false
    }

    public reasignArrayList(id: string, index: number, value: Primitive): boolean {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                // console.log("symbol", symbol.type, "value", value.typeValue)
                let temp: ReturnType = symbol.value[index]
                // console.log("temp", temp, "value", value)
                if (temp.type !== value.typeValue) {
                    this.setErrore(value.line, value.column, `Variable ${id} is not of type ${this.getTypeOf(value.typeValue)}`)
                    return false

                }
                symbol.value[index] = value
                symbol.value[index].type = value.typeValue
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.prev
        }
        this.setErrore(value.line, value.column, `Variable ${id} no encontrada`)
        return false
    }

    public reasignMatrix(id: string, i: number, j: number, value: Primitive): boolean {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                let temp: ReturnType = symbol.value[i][j]
                if (temp.type !== value.typeValue) {
                    this.setErrore(value.line, value.column, `Variable ${id} is not of type ${this.getTypeOf(value.typeValue)}`)
                    // console.log(`Error: Variable ${id} is not of type ${this.getTypeOf(value.typeValue)}`)
                    return false

                }
                symbol.value[i][j] = value
                symbol.value[i][j].type = value.typeValue
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.prev
        }
        this.setErrore(value.line, value.column, `Variable ${id} not found`)
        return false
    }

    public saveArray(id: string, type: Types, values: any, line: number, column: number) {
        let env: Environment = this;
        if (env.ids.has(id.toLowerCase())) {
            this.setErrore(line, column, `Variable ${id} ya existe en el entorno actual`)
            return
        }
        // console.log("value", values)
        // console.log("type", type)
        env.ids.set(id.toLowerCase(), new Symbol(values, id, Types.ARRAY, type));
        symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
    }

    public getValueArray(id: string, i: number): Symbol | null {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                // console.log("symbol  ->", symbol.value[i])
                return symbol.value[i]
            }
            env = env.prev
        }
        return null
    }

    getValueMatrix(id: string, i: number, j: number): Symbol | null {
        let env: Environment | null = this;
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                return symbol.value[i][j]
            }
            env = env.prev;
        }
        return null
    }

    getTypeOf(type: Types): string {
        if (type === Types.INT) {
            return 'int'
        }
        if (type === Types.DOUBLE) {
            return 'double'
        }
        if (type === Types.BOOLEAN) {
            return 'boolean'
        }
        if (type === Types.CHAR) {
            return 'char'
        }
        if (type === Types.STRING) {
            return 'string'
        }
        if (type === Types.ARRAY) {
            return 'array'
        }
        return 'NULL'
    }
    //funcion para obtener el entorno global
    getGlobal(): Environment {
        let env: Environment = this;
        while (env.prev) {
            env = env.prev;
        }
        return env;
    }

    public saveFunction(id: string, func: Function) {
        let env: Environment = this;
        if (env.functions.has(id.toLowerCase())) {
            this.setErrore(func.line, func.column, `La función ${id} ya existe en el entorno actual`)
            return
        }
        // console.log("se guardo la funcion", id.toLowerCase())
        env.functions.set(id.toLowerCase(), func);
        let typeFunc: string = this.getTypeOfFunc(func.types)
        symbolTable.push(func.line, func.column + 1, id.toLowerCase(), 'Function', typeFunc == 'void' ? 'Método' : 'Función', env.name);
    }

    public setErrore(line: number, column: number, description: string) {
        if (this.matchError(line, column + 1, description)) return
        errores.push(new Error(line, column + 1, TypesError.SEMANTICO, description))
    }

    public matchError(line: number, column: number, err: string): boolean {
        for (const s of errores) {
            if (s.line === line && s.column === column && s.description === err) return true
        }
        return false
    }

    public printSymTab() {
        console.log('Symbol Table:')
        console.log('Name\tType\tValue\tEnv')
        for (let [key, value] of this.ids) {
            // console.log(value.id, value.type, value.value, this.name)
            if (value.type === Types.ARRAY) {
                for (let i = 0; i < value.value.length; i++) {

                    console.log(`${value.id}[${i}]\t${this.getTypeOf(value.type)}\t${value.value[i].value}\t${this.name}`)
                }
            } else {
                console.log(`${value.id}\t${this.getTypeOf(value.type)}\t${value.value}\t${this.name}`)
            }
        }
        console.log('Function Table:')
        console.log('Name\tType\tEnv')
        for (let [key, value] of this.functions) {
            console.log(`${key}\t${this.getTypeOfFunc(value.types)}\t${this.name}`)
        }
    }

    public getFunction(id: string): Function | null {
        let env: Environment | null = this
        while (env) {
            if (env.functions.has(id.toLowerCase())) {
                return env.functions.get(id.toLowerCase())!
            }
            env = env.prev
        }
        return null
    }

    public setPrint(value: any) {
        printConsole.push(value)
    }

    getTypeOfFunc(type: Types): string {
        if (type === Types.INT) {
            return 'int'
        }
        if (type === Types.DOUBLE) {
            return 'double'
        }
        if (type === Types.BOOLEAN) {
            return 'boolean'
        }
        if (type === Types.CHAR) {
            return 'char'
        }
        if (type === Types.STRING) {
            return 'string'
        }
        return 'void'
    }
}