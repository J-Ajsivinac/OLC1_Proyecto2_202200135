export class Error {
    constructor(public type: string, public description: string, public line: number, public column: number) { }

    public toString(): string {
        return ` --> Error ${this.type}: ${this.description} En la linea: ${this.line}, columna: ${this.column}`;
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