import Post from "../models/Post.js"

//Create post
export const createPost = async (req, res) => {
    try {
        const { title, body } = req.body
        const userId = req?.user?._id
        if (!title || !body) {
            return res.status(400).json({ error: "missing fields" })
        }
        const newPost = new Post({
            title,
            body,
            postedBy: userId
        })
        await newPost.save()

        return res.status(201).json({ message: "post added successfully!" })

    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Get post by id
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "missing fields" })
        }

        const exisitingPost = await Post.findById(id)

        if (!exisitingPost) {
            return res.status(404).json({ error: "Post not found!" })
        }
        return res.status(201).json({ message: "post found successfully!", post: exisitingPost })

    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})

        if (!Array.isArray(posts) || posts?.length <= 0) {
            return res.status(404).json({ error: "Post not found!" })

        }

        return res.status(201).json({ message: "posts found successfully!", posts })

    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//delete post by id
export const deletePostById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "missing fields" })
        }

        const exisitingPost = await Post.findByIdAndDelete(id)

        if (!exisitingPost) {
            return res.status(404).json({ error: "Post not found!" })
        }
        return res.status(200).json({ message: "post delete successfully!", })

    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//udpate post by id
export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, body } = req.body
        if (!id) {
            return res.status(400).json({ error: "missing fields" })
        }
        if (!title || !body) {
            return res.status(400).json({ error: "missing fields" })
        }
        const exisitingPost = await Post.findByIdAndUpdate(id, {
            title,
            body
        }, {
            new: true
        })

        if (!exisitingPost) {
            return res.status(404).json({ error: "Post not found!" })
        }
        return res.status(201).json({ message: "post updated successfully!", post: exisitingPost })

    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}
