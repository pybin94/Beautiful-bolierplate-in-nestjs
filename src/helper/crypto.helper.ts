import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

@Injectable()
export class Crypto {
  
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto.createHash('sha256').update(process.env.PORT).digest();;
  private readonly iv = crypto.randomBytes(16); 
  private readonly cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

  encrypt(text: string): string {
    let encrypted = this.cipher.update(text);
    encrypted = Buffer.concat([encrypted, this.cipher.final()]);

    return encrypted.toString('hex');
  }

  decrypt(text: string): string {
    const [encryptedHex] = text.split(':');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  encryptObject(object: Record<string, any>): string {
    const json = JSON.stringify(object);

    let encrypted = this.cipher.update(json, 'utf8', 'hex');
    encrypted += this.cipher.final('hex');

    return encrypted;
  }

  async bcript(text: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(text, saltOrRounds);
    return hashedPassword;
  }
}