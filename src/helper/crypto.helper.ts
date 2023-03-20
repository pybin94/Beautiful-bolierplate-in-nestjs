import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

@Injectable()
export class Crypto {
  
  private readonly algorithm = 'aes-256-cbc';
  private readonly iv = crypto.randomBytes(16); 

  encrypt(data: string): string {
    const key = crypto.createHash('sha256').update(process.env.CRYPTO_SECRET_KEY).digest();
    const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);

    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  }

  decrypt(hash: string): string {
    const key = crypto.createHash('sha256').update(process.env.CRYPTO_SECRET_KEY).digest();
    const [encryptedHex] = hash.split(':');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, key, this.iv);

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  encryptObject(object: Record<string, any>): string {
    const key = crypto.createHash('sha256').update(process.env.CRYPTO_SECRET_KEY).digest();
    const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
    const json = JSON.stringify(object);

    let encrypted = cipher.update(json, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  async bcript(text: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(text, saltOrRounds);
    return hashedPassword;
  }
}