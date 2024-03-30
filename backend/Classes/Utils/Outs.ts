export var printConsole: string[] = [];

export function getConsoleString(): string {
    let result: string = "";
    printConsole.forEach(element => {
        result += element;
    });
    result += "\n";
    return result;
}

export function resetOuts() {
    printConsole = [];
}
