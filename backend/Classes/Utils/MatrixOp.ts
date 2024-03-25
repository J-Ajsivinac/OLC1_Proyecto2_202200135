import { Types } from './Types';

export const plus: Types[][] = [
    [Types.INT, Types.DOUBLE, Types.INT, Types.INT, Types.STRING],
    [Types.DOUBLE, Types.DOUBLE, Types.DOUBLE, Types.DOUBLE, Types.STRING],
    [Types.INT, Types.DOUBLE, Types.NULL, Types.NULL, Types.STRING],
    [Types.INT, Types.DOUBLE, Types.NULL, Types.STRING, Types.STRING],
    [Types.STRING, Types.STRING, Types.STRING, Types.STRING, Types.STRING]
]
export const minus: Types[][] = [
    [Types.INT, Types.DOUBLE, Types.INT, Types.INT, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.DOUBLE, Types.DOUBLE, Types.NULL],
    [Types.INT, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.INT, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL]
]
export const mult: Types[][] = [
    [Types.INT, Types.DOUBLE, Types.NULL, Types.INT, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.DOUBLE, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.INT, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL]
]
export const div: Types[][] = [
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.DOUBLE, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.DOUBLE, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL]
]
export const pow: Types[][] = [
    [Types.INT, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL]
]
export const mod: Types[][] = [
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.DOUBLE, Types.DOUBLE, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL],
    [Types.NULL, Types.NULL, Types.NULL, Types.NULL, Types.NULL]
]