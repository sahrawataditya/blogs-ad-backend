import express from "express";
import { allUsers, deleteUserById, getUserbyId, registerUser, updateUserById } from "../controllers/user.controller.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router()

router.use(adminMiddleware)
router.get('/', (req, res) => { res.send("Hello from users router") })
router.get('/get-all', allUsers)
router.get('/get/:id', getUserbyId)
router.post('/add', registerUser)
router.delete('/delete/:id', deleteUserById)
router.put('/update/:id', updateUserById)

export default router