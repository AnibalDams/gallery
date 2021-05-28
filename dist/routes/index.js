"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./users/index"));
var index_2 = __importDefault(require("./normal/index"));
var index_3 = __importDefault(require("./upload/index"));
var index_4 = __importDefault(require("./gallery/index"));
// ==================== Initializations ====================
var router = express_1.default.Router();
// ==================== All Routes ====================
router.use("/", index_2.default);
router.use("/user", index_1.default);
router.use('/gallery', index_4.default);
router.use("/upload", index_3.default);
exports.default = router;
