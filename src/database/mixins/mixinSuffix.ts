export type AddSuffix<TMixin, TSuffix extends string> = {
    [P in keyof TMixin as `${Exclude<P, symbol>}${TSuffix}`]: TMixin[P];
};