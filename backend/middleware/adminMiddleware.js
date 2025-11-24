const authorizeAdmin = (req, res, next) => {
    // This middleware should run AFTER the 'protect' middleware
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
};

module.exports = { authorizeAdmin };