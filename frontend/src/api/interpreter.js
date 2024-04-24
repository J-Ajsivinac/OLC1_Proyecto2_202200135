import axios from "./axios";

export const runInterpreter = async (code) => axios.post("interpreter/parser",code)
export const getAST = async () => axios.get("interpreter/getAST")
export const getSymbolTableRequest = async () => axios.get("interpreter/getSymbolTable")
export const getErrors = async () => axios.get("interpreter/getErrors")
export const saveFileRequest = async (code) => axios.post("/save", code)