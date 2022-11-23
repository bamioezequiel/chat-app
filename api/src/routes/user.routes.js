import { Router } from "express";
import { getAllUsers, getUser, setAvatar } from "../controllers/user.controllers.js";

const router = Router();

router.post('/', getUser);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', getAllUsers);

export default router;