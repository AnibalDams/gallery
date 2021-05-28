"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = require("path");
var storage = multer_1.default.diskStorage({});
var multerUploads = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var fileExtension = path_1.extname(file.originalname);
        cb(null, true);
    }
});
exports.multerUploads = multerUploads;
