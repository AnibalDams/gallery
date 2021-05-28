"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var signUp_1 = __importDefault(require("./POST/signUp"));
var login_1 = __importDefault(require("./POST/login"));
var authenticate_1 = __importDefault(require("../../configs/authenticate"));
// ==================== Initializations ====================
var router = express_1.default.Router();
// ==================== GET ====================
router.get('/', authenticate_1.default, function (req, res) {
    res.json({ message: "Hello " + req.user.firstName + " " + req.user.lastName + " :D", url: req.protocol + "://" + req.hostname + req.originalUrl });
});
// ==================== POST ====================
router.post('/signup', signUp_1.default);
router.post('/login', login_1.default);
// ==================== PUT ====================
exports.default = router;
