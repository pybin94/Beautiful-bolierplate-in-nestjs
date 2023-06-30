"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
let Crypto = class Crypto {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.key = process.env.CRYPTO_SECRET_KEY;
        this.iv = process.env.CRYPTO_SECRET_IV;
    }
    encrypt(data) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }
    decrypt(data) {
        const [encryptedHex] = data.split(':');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    encryptObject(object) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        const json = JSON.stringify(object);
        let encrypted = cipher.update(json, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    hashEncrypt(data) {
        const hash = crypto.createHash('sha512');
        hash.update(data);
        return hash.digest('hex');
    }
    async bcript(text) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(text, saltOrRounds);
        return hashedPassword;
    }
};
Crypto = __decorate([
    (0, common_1.Injectable)()
], Crypto);
exports.Crypto = Crypto;
//# sourceMappingURL=crypto.helper.js.map