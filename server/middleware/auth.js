// Import jwt (JSON Web Token) for token verification
const jwt = require('jsonwebtoken');

// Authentication middleware to verify JWT tokens
const authenticate = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request object for use in the next middleware/route
        req.userId = decoded.id;
        console.log(req.userId); // Logging user ID for debugging purposes

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid or verification fails, return a 400 response
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Export the authentication middleware to be used in other routes
module.exports = authenticate;
