const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }

        req.user = decoded; // decoded will contain the user information
        next();
    });
};

module.exports = authMiddleware;