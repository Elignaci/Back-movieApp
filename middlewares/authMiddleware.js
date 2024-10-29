const { admin } = require('../config/firebase');

/**
 * Middleware para verificar el token de acceso de Firebase.
 * 
 * @param {Object} req - Solicitud.
 * @param {Object} res - Respuesta.
 * @param {Function} next - Función para continuar con el siguiente middleware.
 */
const verifyToken = async (req, res, next) => {
    // Extraer el token de la cookie
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: 'Token no proporcionado.'
        });
    }

    try {
        // Verificar el token usando Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.authenticatedUser = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            ok: false,
            error: 'Token no válido.'
        });
    }
};

/**
 * Middleware para verificar si el usuario tiene uno de los roles permitidos.
 * 
 * @param {Array} roles - Array de roles permitidos.
 * @returns {Function} - Middleware que verifica el rol del usuario.
 */
const verifyRole = (roles) => {
    // Obtener el rol del usuario desde las cookies
    const userRole = req.cookies.user_role;

    // Verifica si el rol está permitido
    if (!roles.includes(userRole)) {
        return res.status(403).json({
            ok: false,
            error: 'Acceso denegado. Rol no autorizado.'
        });
    }

    next();
};



module.exports = { 
    verifyToken,
    verifyRole
};
