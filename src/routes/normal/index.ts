import express, { Request, Response } from "express";
import signUp from './POST/signUp';
import login from './POST/login';
import authenticateJwt from '../../configs/authenticate';

// ==================== Initializations ====================

const router = express.Router();


// ==================== GET ====================

router.get('/', authenticateJwt, (req: Request | any, res: Response) => {
    
    res.json({ message: `Hello ${req.user.firstName} ${req.user.lastName} :D`, url: `${req.protocol}://${req.hostname}${req.originalUrl}` });

});


// ==================== POST ====================

router.post('/signup', signUp);
router.post('/login', login);

// ==================== PUT ====================




export default router;
