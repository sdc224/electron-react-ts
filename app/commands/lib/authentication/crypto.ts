import * as Crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const password = 'd6F3Efeq';

const generateKey = () => Crypto.scryptSync(password, 'salt', 32);
const iv = Crypto.randomBytes(16);

export function encryptString(text: string) {
  try {
    const cipher = Crypto.createCipheriv(algorithm, generateKey(), iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const cipherAuthorTag = cipher.getAuthTag();
    return {
      content: crypted,
      tag: cipherAuthorTag
    };
  } catch (error) {
    // TODO : Cryptographic error generic with messages
    throw new Error(error);
  }
}

export function decryptString(text: string, cipherAuthorTag: Buffer) {
  try {
    if (!cipherAuthorTag) throw new Error('Decryption error');
    const decipher = Crypto.createDecipheriv(algorithm, generateKey(), iv);
    decipher.setAuthTag(cipherAuthorTag);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (error) {
    // TODO : Cryptographic error generic with messages
    throw new Error(error);
  }
}
