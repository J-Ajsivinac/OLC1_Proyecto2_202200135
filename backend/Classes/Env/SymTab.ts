export class SymbolTab {
    public n: number = 0
    constructor(public line: number, public column: number, public id: string, public typeId: string, public type: string, public env: string) { }

    public getDot(): string {
        return `<tr>
            <td>${this.n}</td>
            <td>${this.id}</td>
            <td>${this.typeId}</td>
            <td>${this.type}</td>
            <td>${this.env}</td>
            <td>${this.line}</td>
            <td>${this.column}</td>
        </tr>`
    }
}