import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized" })
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.PASSWORD) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })

    }
}

export default adminAuth;