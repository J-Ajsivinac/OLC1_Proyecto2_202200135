import axios from "./axios";

export const runInterpreter = async (code) => axios.post("interpreter/parser",code)