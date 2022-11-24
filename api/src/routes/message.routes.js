import { Router } from "express";
import { addMessage, getMessage } from "../controllers/message.controllers.js";

const router = Router();

router.post('/addMessage', addMessage);
router.post('/getMessages', getMessage);

export default router;