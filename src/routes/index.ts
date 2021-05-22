import express from "express";
import userRoutes from "./users/index";
import normalRoutes from "./normal/index";
import uploadRoutes from "./upload/index";
import galleryRoutes from './gallery/index'

const router = express.Router();

router.use("/", normalRoutes);
router.use("/user", userRoutes)
router.use('/gallery', galleryRoutes)
router.use("/upload", uploadRoutes);



export default router;
