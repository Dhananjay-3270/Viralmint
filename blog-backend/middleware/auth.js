// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach the user ID to the request object
        console.log(req.userId)
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
