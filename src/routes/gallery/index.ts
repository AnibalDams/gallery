import express from "express";
import findAll from './GET/all';
import authenticateJwt from '../../configs/authenticate';
import findUnique from './GET/findUnique';
import Delete from './DELETE/delete'
const router = express.Router();

// ==================== GET Routes ====================

router.get('/', authenticateJwt, findAll);
router.get('/:mediaId', authenticateJwt, findUnique);

// ==================== GET Routes ====================

router.delete('/:mediaId', authenticateJwt ,Delete)

export default router;
