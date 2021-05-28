"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var profile_1 = __importDefault(require("./GET/profile"));
var updateAvatar_1 = __importDefault(require("./PUT/updateAvatar"));
var multer_1 = require("../../utils/multer");
var authenticate_1 = __importDefault(require("../../configs/authenticate"));
var router = express_1.default.Router();
// ==================== GET ====================
router.get("/profile", authenticate_1.default, profile_1.default);
// ==================== PUT ====================
router.put("/updateAvatar", multer_1.multerUploads.single("media"), authenticate_1.default, updateAvatar_1.default);
exports.default = router;
