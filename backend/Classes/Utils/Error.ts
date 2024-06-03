export class Error {
    constructor(public line: number, public column: number, public type: TypesError, public description: string) { }

    public toString(): string {
        return ` ¤ Error ${this.type}, ${this.description} En la linea: ${this.line}, columna: ${this.column} \n`;
    }

    public toHTML(): string {
        return `<tr>
            <td>${this.type}</td>
            <td>${this.description}</td>
            <td>${this.line}</td>
            <td>${this.column}</td>
        </tr>`;
    }

    public getData(): string[] {
        return [this.type, this.description, this.line.toString(), this.column.toString()];
    }
}

export enum TypesError {
    LEXICO = "LEXICO",
    SINTACTICO = "SINTACTICO",
    SEMANTICO = "SEMANTICO",
}