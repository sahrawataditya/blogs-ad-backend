import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { createRequire } from 'module';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const router = express.Router()

router.get('/', (req, res) => { res.send("Hello from auth") })
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;
