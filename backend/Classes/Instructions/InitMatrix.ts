import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultArray } from "../Utils/Defaults";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class InitMatrix extends Instruction {

    private type: Types;
    constructor(line: number, column: number, private id: string, private typeTemp: string, private size: Expression, private size2: Expression, private values: any[]) {
        super(line, column, TypesInstruction.INIT_ARRAY)
        this.type = convertToType(typeTemp)
    }

    public execute(env: Environment) {
        if (this.values) {
            for (let i = 0; i < this.values.length; i++) {
                if (!Array.isArray(this.values[i])) {
                    return console.log(`Error: el valor ${this.values[i]} no es un arreglo`)
                }
                for (let j = 0; j < this.values[i].length; j++) {
                    this.values[i][j] = this.values[i][j].execute(env)
                }
            }
            env.saveArray(this.id, this.type, this.values, this.line, this.column)
        } else {
            let length: ReturnType = this.size.execute(env)
            env.saveArray(this.id, this.type, this.arrayByLength(length.value, this.type, env), this.line, this.column)
        }
    }

    private arrayByLength(length: number, type: Types, env: Environment): Array<any> {
        let l = new Array(length)
        for (let i = 0; i < length; i++) {
            let length2: number = this.size2.execute(env).value
            l[i] = new Array(length2)
            for (let j = 0; j < length2; j++) {
                l[i][j] = getValueDefaultArray(type, this.type)
            }
        }
        return l;
    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node${id} [label="InitMatrix"];\n`
        //Hijo 1
        const size = this.size.ast(ast)
        dot += size.dot
        dot += `node${id} -> node${size.id}\n`
        //Hijo 2
        const size2 = this.size2.ast(ast)
        dot += size2.dot
        dot += `node${id} -> node${size2.id}\n`
        return { dot: dot, id: id }
    }

}