"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var all_1 = __importDefault(require("./GET/all"));
var authenticate_1 = __importDefault(require("../../configs/authenticate"));
var findUnique_1 = __importDefault(require("./GET/findUnique"));
var delete_1 = __importDefault(require("./DELETE/delete"));
var router = express_1.default.Router();
// ==================== GET Routes ====================
router.get('/', authenticate_1.default, all_1.default);
router.get('/:mediaId', authenticate_1.default, findUnique_1.default);
// ==================== GET Routes ====================
router.delete('/:mediaId', authenticate_1.default, delete_1.default);
exports.default = router;
