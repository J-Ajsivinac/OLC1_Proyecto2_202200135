import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Natives } from "../Expressions/Natives";
import { AST, ReturnAST } from "../Utils/AST";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultArray } from "../Utils/Defaults";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypesIns";

export class InitArray extends Instruction {

    private type: Types;
    constructor(line: number, column: number, private id: string, private tempType: string, public size: Expression, public values: any[]) {
        super(line, column, TypesInstruction.INIT_ARRAY)
        this.type = convertToType(tempType)
    }

    public execute(env: Environment) {
        if (this.values) {
            for (let i = 0; i < this.values.length; i++) {
                this.values[i] = this.values[i].execute(env)
                console.log("Values --> ", this.values[i])
            }
            console.log("Values xd --> ", this.values)
            // console.log("Tipo --> ", this.type)
            env.saveArray(this.id, this.type, this.values, this.line, this.column)
        } else {
            let length: ReturnType = this.size.execute(env)
            env.saveArray(this.id, this.type, this.arrayByLength(length.value, this.type), this.line, this.column)
        }
    }

    private arrayByLength(length: number, type: Types): Array<any> {
        let l = new Array(length)
        for (let i = 0; i < length; i++) {
            l[i] = getValueDefaultArray(type, this.type)
        }
        return l
    }
    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="INIT_ARRAY"];\n`

        dot += `node_${id}_type [label="${this.tempType}"];\n`
        dot += `node_${id}_id [label="${this.id}"];\n`
        dot += `node_${id}_lcor [label="["];\n`
        dot += `node_${id}_rcor [label="]"];\n`
        dot += `node_${id}_equal [label="="];\n`

        if (this.values) {
            dot += `node_${id}_asign [label="ASIGN_ARRAY"]\n`
            dot += `node_${id}_lcor1 [label="["];\n`
            let index = 0
            for (let i = 0; i < this.values.length; i++) {
                if (i == 0) {
                    if (this.values[i] instanceof Instruction && this.values[i] instanceof Natives) {
                        let value: ReturnAST = this.values[i].ast(ast)
                        dot += value.dot
                        dot += `node_${id}_${i}_value [label="${value.id}"];\n`
                        dot += `node_${id}_${i}_dot [label ="."];\n`
                        dot += `node_${id}_${i}_ctr [label="c_str"];\n`
                        dot += `node_${id}_${i}_lparen [label="("];\n`
                        dot += `node_${id}_${i}_rparen [label=")"];\n`
                    } else {

                        dot += `\nnode_${id}_${i}_values [label="VALUES_ARRAY"];\n`
                        dot += `\nnode_${id}_${i}_value [label="VALUE_ARRAY"];\n`
                        // let val = this.values[i].ast(ast)
                        dot += `\nnode_${id}_${i}_val [label="${this.values[i].value}"];\n`
                        //conectar nodos
                        dot += `\nnode_${id}_${i}_values -> node_${id}_${i}_value;\n`
                        dot += `node_${id}_${i}_value -> node_${id}_${i}_val;\n`
                    }
                } else {
                    dot += `\nnode_${id}_${i}_values [label="VALUES_ARRAY"];\n`
                    dot += `\nnode_${id}_${i}_comma[label="," color="#7580f9" fontcolor="white"];`
                    dot += `\nnode_${id}_${i}_value[label="VALUE_ARRAY" color="#7580f9" fontcolor="white"];`
                    dot += `\nnode_${id}_${i}_val [label="${this.values[i].value}"];\n`
                    // dot += value.dot
                    //conectar nodos
                    dot += `\nnode_${id}_${i}_values -> node_${id}_${i-1}_values;`
                    dot += `\nnode_${id}_${i}_values -> node_${id}_${i}_comma;\n`
                    dot += `node_${id}_${i}_values -> node_${id}_${i}_value;\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_val;\n`
                }
                index = i
            }
            dot += `node_${id}_rcor1 [label="]"];\n`

            //conectar nodos
            if (this.values[0] instanceof Instruction && this.values[0] instanceof Natives) {
                dot += `node_${id}_asign -> node_${id}_value;\n`
                dot += `node_${id}_asign -> node_${id}_dot;\n`
                dot += `node_${id}_asign -> node_${id}_ctr;\n`
                dot += `node_${id}_asign -> node_${id}_lparen;\n`
                dot += `node_${id}_asign -> node_${id}_rparen;\n`
            } else {
                dot += `node_${id}_asign -> node_${id}_lcor1;\n`
                dot += `node_${id}_asign -> node_${id}_${index}_values;\n`
                dot += `node_${id}_asign -> node_${id}_rcor1;\n`
            }

            //conectar nodos

        } else {
            dot += `\nnode_${id}_asign [label="ASIGN_ARRAY"]\n`
            dot += `node_${id}_new [label="NEW"]\n`
            dot += `node_${id}_lcor_1 [label="["];\n`
            let size: ReturnAST = this.size.ast(ast)
            dot += "\n" + size.dot + "\n"
            dot += `node_${id}_rcor_1 [label="]"];\n`
            dot += `node_${id}_asign -> node_${id}_new;\n`
            dot += `node_${id}_asign -> node_${id}_lcor_1;\n`
            dot += `node_${id}_asign -> node_${size.id};\n`
            dot += `node_${id}_asign -> node_${id}_rcor_1;\n`
        }

        dot += `node_${id} -> node_${id}_type;\n`
        dot += `node_${id} -> node_${id}_id;\n`
        dot += `node_${id} -> node_${id}_lcor;\n`
        dot += `node_${id} -> node_${id}_rcor;\n`
        dot += `node_${id} -> node_${id}_equal;\n`
        dot += `node_${id} -> node_${id}_asign;\n`
        return { dot: dot, id: id }
    }
}