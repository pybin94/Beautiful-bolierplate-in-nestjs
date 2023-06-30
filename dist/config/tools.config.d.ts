interface MakeObject {
    status: number;
    message: string;
    data: object;
}
export declare const makeObject: (makeObject: MakeObject) => {
    status: string;
};
export declare const now: () => string;
export declare const arrayOrder: (key: string) => (a: any, b: any) => 0 | 1 | -1;
export {};
