import { Expression } from "../Abstracts/Expression";
import { Instruction } from "../Abstracts/Instruction";
import { Environment } from "../Env/Environment";
import { Natives } from "../Expressions/Natives";
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

    public astArray1() {

    }

    public ast(ast: AST): ReturnAST {
        const id = ast.getNewID()
        var dot = `node_${id} [label="INIT_ARRAY"];\n`

        dot += `node_${id}_type [label="${this.typeTemp}"];\n`
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

                    dot += `\nnode_${id}_${i}_values [label="VALUES_ARRAY"];\n`
                    dot += `\nnode_${id}_${i}_value [label="VALUE_ARRAY"];\n`
                    // let val = this.values[i].ast(ast)
                    dot += `\nnode_${id}_${i}_lcorJ [label="["];\n`
                    dot += `\nnode_${id}_${i}_asign [label="ASIGN_ARRAY"]\n`
                    let index2 = 0
                    for (let j = 0; j < this.values[i].length; j++) {
                        if (j == 0) {
                            dot += `\nnode_${id}_${i}_${j}_values [label="VALUES_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_value [label="VALUE_ARRAY /()"];\n`

                            dot += `node_${id}_${i}_${j}_val [label="${this.values[i][j].value}"];\n`

                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_value;\n`
                            dot += `node_${id}_${i}_${j}_value -> node_${id}_${i}_${j}_val;\n`
                        } else {
                            dot += `\nnode_${id}_${i}_${j}_values [label="VALUES_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_comma[label="," color="#7580f9" fontcolor="white"];`
                            dot += `\nnode_${id}_${i}_${j}_value [label="VALUE_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_val [label="${this.values[i][j].value}"];\n`

                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j - 1}_values;\n`
                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_comma;\n`
                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_value;\n`
                            dot += `node_${id}_${i}_${j}_value -> node_${id}_${i}_${j}_val;\n`
                        }
                        index2 = j
                    }
                    // dot += ``
                    dot += `\nnode_${id}_${i}_asign -> node_${id}_${i}_${index2}_values;\n`
                    //conectar nodos

                    //conectar nodos
                    dot += `\nnode_${id}_${i}_values -> node_${id}_${i}_value;\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_asign;\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_lcorJ;\n`

                    dot += `\nnode_${id}_${i}_rcorJ2 [label="]"];\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_rcorJ2;\n`

                } else {
                    dot += `\nnode_${id}_${i}_values [label="VALUES_ARRAY"];\n`
                    dot += `\nnode_${id}_${i}_comma[label="," color="#7580f9" fontcolor="white"];`
                    dot += `\nnode_${id}_${i}_value[label="VALUE_ARRAY" color="#7580f9" fontcolor="white"];`

                    //Datos

                    dot += `\nnode_${id}_${i}_lcorJ [label="["];\n`
                    dot += `\nnode_${id}_${i}_asign [label="ASIGN_ARRAY"]\n`
                    let index2 = 0
                    for (let j = 0; j < this.values[i].length; j++) {
                        if (j == 0) {
                            dot += `\nnode_${id}_${i}_${j}_values [label="VALUES_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_value [label="VALUE_ARRAY /()"];\n`

                            dot += `node_${id}_${i}_${j}_val [label="${this.values[i][j].value}"];\n`

                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_value;\n`
                            dot += `node_${id}_${i}_${j}_value -> node_${id}_${i}_${j}_val;\n`
                        } else {
                            dot += `\nnode_${id}_${i}_${j}_values [label="VALUES_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_comma[label="," color="#7580f9" fontcolor="white"];`
                            dot += `\nnode_${id}_${i}_${j}_value [label="VALUE_ARRAY"];\n`
                            dot += `\nnode_${id}_${i}_${j}_val [label="${this.values[i][j].value}"];\n`

                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j - 1}_values;\n`
                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_comma;\n`
                            dot += `node_${id}_${i}_${j}_values -> node_${id}_${i}_${j}_value;\n`
                            dot += `node_${id}_${i}_${j}_value -> node_${id}_${i}_${j}_val;\n`
                        }
                        index2 = j
                    }
                    // dot += ``
                    dot += `\nnode_${id}_${i}_asign -> node_${id}_${i}_${index2}_values;\n`
                    //conectar nodos


                    //fin datos

                    // dot += value.dot
                    //conectar nodos
                    dot += `\nnode_${id}_${i}_values -> node_${id}_${i - 1}_values;`
                    dot += `\nnode_${id}_${i}_values -> node_${id}_${i}_comma;\n`
                    dot += `node_${id}_${i}_values -> node_${id}_${i}_value;\n`
                    // dot += `\nnode_${id}_${i}_lcorJ2 [label="["];\n`
                    // dot += `\nnode_${id}_${i}_${i}_lcorJ2 -> node_${id}_${i}_values;\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_asign;\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_lcorJ;\n`

                    dot += `\nnode_${id}_${i}_rcorJ2 [label="]"];\n`
                    dot += `node_${id}_${i}_value -> node_${id}_${i}_rcorJ2;\n`
                }
                index = i
            }
            dot += `node_${id}_rcor1 [label="]"];\n`

            //conectar nodos

            dot += `node_${id}_asign -> node_${id}_lcor1;\n`
            dot += `node_${id}_asign -> node_${id}_${index}_values;\n`
            dot += `node_${id}_asign -> node_${id}_rcor1;\n`


            //conectar nodos

        } else {
            dot += `\nnode_${id}_asign [label="ASIGN_ARRAY"]\n`

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