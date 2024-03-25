export enum Types {
    INT,
    DOUBLE,
    STRING,
    CHAR,
    BOOLEAN,
    ARRAY,
    NULL
}

// Linea para exportar el tipo de dato
export type ReturnType = { value: any, type: Types }