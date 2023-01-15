import CryptoJS from 'crypto-js';

const encrypt = (value) => {
    const passphrase = process.env.PASSPHRASE;
    return CryptoJS.AES.encrypt(value, passphrase)
            .toString()
            .replace(/\//g, "-");
};

const decrypt = (value) => {
    const passphrase = process.env.PASSPHRASE;
    return CryptoJS.AES.decrypt(value, passphrase);
}

export default {
    encrypt,
    decrypt,
};