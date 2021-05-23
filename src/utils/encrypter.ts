import CryptoJs from 'crypto-js'


export function Encrypt(toEncrypt: string, key: any | string) {
    let encrypted: string = "";
    let crypter: string;

    let crypherPassword = CryptoJs.AES.encrypt(toEncrypt, key).toString()

    crypter = crypherPassword;
    let crypherPassword2 = CryptoJs.AES.encrypt(crypter, key).toString()
    encrypted = crypherPassword2



    return encrypted
}

export function Descrypt(encrypted: string, key: string) {


    let bytes1 = CryptoJs.AES.decrypt(encrypted, key).toString(CryptoJs.enc.Utf8)
    let bytes2 = CryptoJs.AES.decrypt(bytes1, key)
    let descrypted = bytes2.toString(CryptoJs.enc.Utf8)
    return descrypted


}

export function DescryptAndCompare(encrypted: string, Inserted: string, key: any | string):boolean {


    let bytes1 = CryptoJs.AES.decrypt(encrypted, key).toString(CryptoJs.enc.Utf8)
    let bytes2 = CryptoJs.AES.decrypt(bytes1, key)
    let password = bytes2.toString(CryptoJs.enc.Utf8)

    if (password === Inserted) {
        return true
    }
    else {
        return false
    }

}
