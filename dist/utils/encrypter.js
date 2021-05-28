"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescryptAndCompare = exports.Descrypt = exports.Encrypt = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
function Encrypt(toEncrypt, key) {
    var encrypted = "";
    var crypter;
    var crypherPassword = crypto_js_1.default.AES.encrypt(toEncrypt, key).toString();
    crypter = crypherPassword;
    var crypherPassword2 = crypto_js_1.default.AES.encrypt(crypter, key).toString();
    encrypted = crypherPassword2;
    return encrypted;
}
exports.Encrypt = Encrypt;
function Descrypt(encrypted, key) {
    var bytes1 = crypto_js_1.default.AES.decrypt(encrypted, key).toString(crypto_js_1.default.enc.Utf8);
    var bytes2 = crypto_js_1.default.AES.decrypt(bytes1, key);
    var descrypted = bytes2.toString(crypto_js_1.default.enc.Utf8);
    return descrypted;
}
exports.Descrypt = Descrypt;
function DescryptAndCompare(encrypted, Inserted, key) {
    var bytes1 = crypto_js_1.default.AES.decrypt(encrypted, key).toString(crypto_js_1.default.enc.Utf8);
    var bytes2 = crypto_js_1.default.AES.decrypt(bytes1, key);
    var password = bytes2.toString(crypto_js_1.default.enc.Utf8);
    if (password === Inserted) {
        return true;
    }
    else {
        return false;
    }
}
exports.DescryptAndCompare = DescryptAndCompare;
