// import { parser } from "../Grammar/Parser.js"
const parser = require("./Grammar/Parser.js");
function main() {
    try {
        const grammar = parser.parse("EXEC 11+2*5/3;");
        console.log(grammar);
        console.log("Analisis sintactico exitoso");
    }
    catch (error) {
        console.log(error);
    }
}
export {};
