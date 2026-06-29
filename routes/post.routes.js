import express from "express";
import { createPost, deletePostById, getPostById, getPosts, updatePostById } from "../controllers/post.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.use(authMiddleware)
router.get('/', (req, res) => { res.send("Hello from post router") })
router.get('/get/:id', getPostById)
router.get('/get-all', getPosts)
router.post('/create', createPost)
router.delete('/delete/:id', deletePostById)
router.put('/update/:id', updatePostById)

export default router