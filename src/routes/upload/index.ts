import express from "express";
import upload from './POST/upload';
import authenticateJwt from '../../configs/authenticate'
import { multerUploads } from '../../utils/multer';
const router = express.Router();

// ==================== POST Routes ====================

router.post('/new', authenticateJwt, multerUploads.single('media'), upload);

// ==================== PUT Routes ====================



export default router;
