import { Router } from "express";
import { getUser } from "../controllers/user.controllers.js";

const router = Router();

router.post('/', getUser);

export default router;