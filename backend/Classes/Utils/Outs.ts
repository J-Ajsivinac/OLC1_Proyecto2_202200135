import { Error } from "./Error";

export var printConsole: string[] = [];
export var errores: Error[] = [];

export function getConsoleString(): string {
    let result: string = "";
    printConsole.forEach(element => {
        result += element;
    });
    result += "\n";
    return result;
}

export function getErrorsString(): string {
    let result: string = "";
    errores.forEach(element => {
        result += element.toString();
    });
    return result;

}

export function resetOuts() {
    printConsole = [];
    errores = [];
}
