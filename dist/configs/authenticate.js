"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authenticateJwt = function (req, res, next) {
    var authToken = req.query.utk;
    var key = process.env.JWTKEY;
    if (authToken) {
        jsonwebtoken_1.verify(authToken, key, function (err, user) {
            if (err) {
                return res.sendStatus(403);
                next(err);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
        next();
    }
};
exports.default = authenticateJwt;
