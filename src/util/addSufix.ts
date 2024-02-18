export type AddSuffix<T, TSuffix extends string> = {
    [P in keyof T as `${Exclude<P, symbol>}${TSuffix}`]: T[P];
};