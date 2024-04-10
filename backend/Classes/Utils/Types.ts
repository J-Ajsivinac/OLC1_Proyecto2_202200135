export enum Types {
    INT,
    DOUBLE,
    CHAR,
    STRING,
    BOOLEAN,
    ARRAY,
    NULL
}

// Linea para exportar el tipo de dato
export type ReturnType = { value: any, type: Types }