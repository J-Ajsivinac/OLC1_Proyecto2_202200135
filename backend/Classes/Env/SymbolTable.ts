import { SymbolTab } from "./SymTab";

export class SymbolTable {
    public symbolTable: Array<SymbolTab> = new Array<SymbolTab>();

    public push(line: number, column: number, id: string, typeId: string, type: string, env: string) {
        let temp = new SymbolTab(line, column, id, typeId, type, env);
        if (this.validate(temp)) {
            temp.n = this.symbolTable.length + 1;
            this.symbolTable.push(temp);
        }
    }

    public validate(value: SymbolTab) {
        return !this.symbolTable.some((symbol) => symbol.id === value.id && symbol.typeId === value.typeId && symbol.type === value.type && symbol.env === value.env)
    }

    public getDot(): string {
        let data: string = `node0[label = "SYMBOL TABLE", fontsize = "20", shape = "box"];\n`;
        for (let i = 0; i < this.symbolTable.length; i++) {
            data += `node${i + 1}[label = "${this.symbolTable[i].id}", fontsize = "20", shape = "box"];\n`;
        }
        for (let i = 0; i < this.symbolTable.length; i++) {
            data += `node0 -> node${i + 1};\n`;
        }
        return data;
    }

    public get(): string {
        return this.symbolTable.map((symbol) => symbol.toString()).join('\n')
    }

    public getsymbolTable(): Array<SymbolTab> {
        return this.symbolTable;
    }
}

export let symbolTable: SymbolTable = new SymbolTable()