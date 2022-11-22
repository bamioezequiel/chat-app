import { Router } from "express";
import { checkUser } from '../middlewares/auth.middlewares.js'; 
import { login, register } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/verifyUser', checkUser);
router.post('/login', login);
router.post('/register', register);

export default router;