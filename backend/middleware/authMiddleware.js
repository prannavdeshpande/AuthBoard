const jwt = require('jsonwebtoken');

// This function will be our middleware
const protect = (req, res, next) => {
    // Get token from the request header
    const token = req.header('x-auth-token');

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user from the token's payload to the request object
        req.user = decoded.user;
        next(); // Move on to the next piece of middleware or the route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { protect };