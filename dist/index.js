"use strict";
// ==================== Imports ====================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var dbConnect_1 = __importDefault(require("./utils/dbConnect"));
var morgan_1 = __importDefault(require("morgan"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var cors_1 = __importDefault(require("cors"));
// ==================== Initializations ====================
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
var port = process.env.PORT || 4000;
var app = express_1.default();
var mongoUri = process.env.MONGO_URI;
dbConnect_1.default(mongoUri);
// ==================== Middlewares ====================
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use('*', function (req, res, next) {
    cloudinary_1.default.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
});
app.use(morgan_1.default("dev"));
// ==================== Routes ====================
app.use("/", index_1.default);
// ==================== Server Initialization ====================
app.listen(port, function () {
    console.log("> server on port " + port + " :D");
});
