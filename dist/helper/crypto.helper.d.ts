export declare class Crypto {
    private readonly algorithm;
    private readonly key;
    private readonly iv;
    encrypt(data: string): string;
    decrypt(data: string): string;
    encryptObject(object: Record<string, any>): string;
    hashEncrypt(data: string): string;
    bcript(text: string): Promise<string>;
}
