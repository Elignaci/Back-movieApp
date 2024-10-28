const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token de acceso.
 */
const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.sendStatus(401);
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (error, payload) => {
            if (error) return res.sendStatus(403); 
            req.userId = payload.id; 
            req.userRole = payload.role;
            next();
        }
    );
};

module.exports = { 
    authenticateToken 
};
