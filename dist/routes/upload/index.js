"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_1 = __importDefault(require("./POST/upload"));
var authenticate_1 = __importDefault(require("../../configs/authenticate"));
var multer_1 = require("../../utils/multer");
var router = express_1.default.Router();
// ==================== POST Routes ====================
router.post('/new', authenticate_1.default, multer_1.multerUploads.single('media'), upload_1.default);
// ==================== PUT Routes ====================
exports.default = router;
