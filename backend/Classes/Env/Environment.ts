import { ReturnType, Types } from "../Utils/Types";
import { Symbol } from "./Symbol";
import { symbolTable } from "./SymbolTable";
import { printConsole } from "../Utils/Outs";
export class Environment {
    private ids: Map<string, Symbol> = new Map<string, Symbol>();
    // public funcs: Map<string,> = new Map<string, string>();
    constructor(private prev: Environment | null, public name: string) { }

    public saveId(id: string, value: any, type: Types, line: number, column: number) {
        let env: Environment = this;
        if (!env.ids.has(id)) {
            env.ids.set(id.toLowerCase(), new Symbol(value, id, type, undefined));
            symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
        }
    }

    public getValue(id: string): Symbol | null {
        let env: Environment | null = this;
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                console.log(id.toLowerCase(), env.ids.get(id.toLowerCase()))
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
                symbol.value = value.value
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.prev
        }
        console.log(`Error: Variable ${id} not found`)
        return false
    }

    public saveArray(id: string, type: Types, values: any, line: number, column: number) {
        let env: Environment = this;
        if (env.ids.has(id.toLowerCase())) {
            console.log(`Error: Variable ${id} already exists`)
            return
        }
        env.ids.set(id.toLowerCase(), new Symbol(values, id, Types.ARRAY, type));
        symbolTable.push(line, column, id.toLowerCase(), 'Variable', this.getTypeOf(type), env.name);
    }

    public getValueArray(id: string, i: number): Symbol | null {
        let env: Environment | null = this;
        while (env !== null) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                if (symbol.type === Types.ARRAY) {
                    return symbol.value[i]
                } else {
                    console.log(`Error: Variable ${id} is not an array`)
                    return null
                }
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
            return 'String'
        }
        if (type === Types.ARRAY) {
            return 'Array'
        }
        return 'NULL'
    }

    public printSymTab() {
        console.log('Symbol Table:')
        console.log('Name\tType\tValue\tEnv')
        for (let [key, value] of this.ids) {
            // console.log(`${value.id}\t${this.getTypeOf(value.type)}\t${value.value}\t${this.name}`)
            if (value.type === Types.ARRAY) {
                for (let i = 0; i < value.value.length; i++) {

                    console.log(`${value.id}[${i}]\t${this.getTypeOf(value.type)}\t${value.value[i].value}\t${this.name}`)
                }
            } else {
                console.log(`${value.id}\t${this.getTypeOf(value.type)}\t${value.value}\t${this.name}`)
            }
        }
    }

    public setPrint(value: any) {
        printConsole.push(value)
    }
}