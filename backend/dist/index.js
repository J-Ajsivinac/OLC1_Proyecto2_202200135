"use strict";
// import { parser } from "../Grammar/Parser.js"
const parser = require("../Grammar/Parser.js");
function main() {
    try {
        const grammar = parser.parse("execute");
        console.log(grammar);
        console.log("Analisis sintactico exitoso 2");
    }
    catch (error) {
        console.log(error);
    }
}
main();
