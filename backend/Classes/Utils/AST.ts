export class AST {
    private nodeID: number = 0;
    constructor() { }

    public getNewID(): number {
        return this.nodeID++;
    }
}

export type ReturnAST = { dot: string, id: number }