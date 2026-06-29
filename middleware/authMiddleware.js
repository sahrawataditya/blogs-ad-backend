import jwt from 'jsonwebtoken'

const token_secret = process.env.JSON_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return res.status(401).json({ error: "Unauthorized !" })
        }
        const replaced_token = token?.replace("Bearer ", '') || ""
        const decoded_token = jwt.verify(replaced_token, token_secret)

        req.user = decoded_token

        next()
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(401).json({ error: "Unauthorized !" })
    }
}

export default authMiddleware