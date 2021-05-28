import express from "express";
import Profile from "./GET/profile";
import updateAvatar from "./PUT/updateAvatar";
import { multerUploads } from "../../utils/multer";
import authenticateJwt from "../../configs/authenticate";
const router = express.Router();

// ==================== GET ====================

router.get("/profile", authenticateJwt, Profile);

// ==================== PUT ====================

router.put(
    "/updateAvatar",
    multerUploads.single("media"),
    authenticateJwt,
    updateAvatar
);

export default router;
