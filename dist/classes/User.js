"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var encrypter_1 = require("../utils/encrypter");
exports.user = {
    getProfile: function (res, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userP, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        userP = _a.sent();
                        if (userP) {
                            res.json({ user: userP });
                        }
                        else {
                            res.status(404).json({ message: "User not found" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        res.json({ message: "An error was occured" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    updateAvatar: function (res, userId, imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var user_1, uploadImageToCloudinary, imageUrl, public_cloudinaryId, uploadImageToCloudinary, imageUrl, public_cloudinaryId, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, userModel_1.default.findById(userId)];
                    case 1:
                        user_1 = _a.sent();
                        if (!user_1.cloudinaryId) return [3 /*break*/, 5];
                        return [4 /*yield*/, cloudinary_1.default.v2.uploader.destroy(user_1.cloudinaryId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(imagePath)];
                    case 3:
                        uploadImageToCloudinary = _a.sent();
                        imageUrl = uploadImageToCloudinary.url;
                        public_cloudinaryId = uploadImageToCloudinary.public_id;
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, {
                                avatar: imageUrl,
                                cloudinaryId: public_cloudinaryId,
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(imagePath)];
                    case 6:
                        uploadImageToCloudinary = _a.sent();
                        imageUrl = uploadImageToCloudinary.url;
                        public_cloudinaryId = uploadImageToCloudinary.public_id;
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, {
                                avatar: imageUrl,
                                cloudinaryId: public_cloudinaryId,
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        res.json({ message: "avatar updated" });
                        return [3 /*break*/, 10];
                    case 9:
                        e_2 = _a.sent();
                        console.error(e_2);
                        res.json({ message: "An error was occured" });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
};
var UserClass = /** @class */ (function () {
    function UserClass(firstName, lastName, email, genre, username, password) {
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.email = email;
        this.genre = genre || "";
        this.username = username || "";
        this.password = password;
    }
    UserClass.prototype.save = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, email, genre, username, password, EncryptedPassword, user_2, usernameFind, emailFind, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = this, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, genre = _a.genre, username = _a.username, password = _a.password;
                        EncryptedPassword = encrypter_1.Encrypt(password, process.env.ENCRYPT_KEY);
                        user_2 = new userModel_1.default({
                            firstName: firstName,
                            lastName: lastName,
                            email: email.toLowerCase(),
                            genre: genre,
                            username: username,
                            avatar: genre === "Male"
                                ? "https://res.cloudinary.com/dfj3oghor/image/upload/v1619988853/avatarDefaultMale_zgjlsw.jpg"
                                : "https://res.cloudinary.com/dfj3oghor/image/upload/v1619988848/avatarDefaultFemale_feyd97.jpg",
                            password: EncryptedPassword,
                        });
                        return [4 /*yield*/, userModel_1.default.find({
                                username: this.username,
                            })];
                    case 1:
                        usernameFind = _b.sent();
                        return [4 /*yield*/, userModel_1.default.find({
                                email: this.email,
                            })];
                    case 2:
                        emailFind = _b.sent();
                        if (!(emailFind.length > 0)) return [3 /*break*/, 3];
                        res.json({ message: "Email already in use" });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(usernameFind.length > 0)) return [3 /*break*/, 4];
                        res.json({ message: "Username already in use" });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, user_2.save()];
                    case 5:
                        _b.sent();
                        res.json({ message: "user Saved", data: user_2 });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_3 = _b.sent();
                        console.error(e_3);
                        res.json({ message: "an error was occurred" });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserClass.prototype.login = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user_3, validatePassword, tokenKey, token, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userModel_1.default.findOne({
                                email: email.toLowerCase(),
                            })];
                    case 1:
                        user_3 = _b.sent();
                        if (user_3) {
                            validatePassword = encrypter_1.DescryptAndCompare(user_3.password, password, process.env.ENCRYPT_KEY);
                            if (validatePassword === false) {
                                res.json({ message: "invalid password" });
                            }
                            else {
                                tokenKey = process.env.JWTKEY;
                                token = jsonwebtoken_1.default.sign({
                                    _id: user_3._id,
                                    firstName: user_3.firstName,
                                    lastName: user_3.lastName,
                                    email: user_3.email,
                                    avatar: user_3.avatar,
                                    genre: user_3.genre,
                                    username: user_3.username,
                                    encryptedPassword: user_3.password,
                                    password: password,
                                }, tokenKey);
                                res.json({ message: "hi there!", token: token });
                            }
                        }
                        else {
                            res.json({ message: "invalid email" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _b.sent();
                        console.error(e_4);
                        res.json({ message: "an error was occurred" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserClass;
}());
exports.default = UserClass;
