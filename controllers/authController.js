const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    sendPasswordResetEmail,
    admin
} = require('../config/firebase');
const { 
    getUserByEmailModel, 
    createUserModel,
    updateUserPasswordByEmailModel 
} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const auth = getAuth();

/**
 * Controlador para registrar un nuevo usuario.
 * Crea el usuario en Firebase, lo guarda en la base de datos 
 * y envía un correo de verificación.
 * 
 * @param {Object} req - Solicitud con los datos de usuario.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Respuesta JSON con mensaje de éxito o error.
 */
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Crear usuario en Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario en la base de datos
        await createUserModel(
            { 
                name, 
                email, 
                hashedPassword, 
                role: 'user' 
            }
        );

        // Enviar email de verificación
        await sendEmailVerification(user);

        // Responder al cliente
        return res.status(201).json(
            { 
                ok: true,
                message: "Usuario registrado." 
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                ok: false, 
                error: "Error, contacta con el administrador" 
            }
        );
    }
};

/**
 * Controlador para iniciar sesión de usuario.
 * Inicia sesión en Firebase, valida los datos y obtiene el rol de usuario 
 * desde la base de datos.
 * 
 * @param {Object} req - Solicitud con las credenciales del usuario.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Respuesta JSON con token, estado de verificación y rol.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Iniciar sesión con Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Consultar la base de datos para obtener el usuario
        const userData = await getUserByEmailModel(email);

        // Verificar si el usuario existe
        if (!userData) {
            return res.status(404).json({
                ok: false,
                error: "Email/contraseña incorrecto."
            });
        }
        
        // Verificar si la contraseña almacenada en la base de datos coincide con la de Firebase
        const passwordMatch = await bcrypt.compare(password, userData.password);
        
        if (!passwordMatch) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await updateUserPasswordByEmailModel(email, hashedPassword);
        }

        // Comprobar si el correo electrónico está verificado
        const isVerified = user.emailVerified;

        // Obtener el token de Firebase
        const idToken = await user.getIdToken();

        // Establecer la cookie con el token de Firebase
        res.cookie(
            'access_token', 
            idToken, 
            {
                httpOnly: true,
                sameSite: 'Strict', 
                maxAge: 3600000 
            }
        );

        // Establecer cookie para el rol 
        res.cookie('user_role', userData.role, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        // Establecer cookie para el email verificado
        res.cookie('email_verified', isVerified, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        // Enviar el ID token y el rol en la respuesta
        return res.status(200).json(
            {
                ok: true, 
                message: "Logeado exitosamente."
            }
        );
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            return res.status(401).json({
                ok: false,
                error: "Email/contraseña incorrecto."
            });
        }
        return res.status(500).json(
            {
                ok: false, 
                error: "Error, contacta con el administrador" 
            }
        );
    }
};

/**
 * Controlador para cerrar sesión.
 * Cierra sesión en Firebase.
 * 
 * @param {Object} req - Solicitud.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Respuesta JSON de éxito o error.
 */
const logout = async (req, res) => {
    try {
        await signOut(auth);
        // Limpiar las cookies
        res.clearCookie('access_token');
        res.clearCookie('user_role');
        res.clearCookie('email_verified');
        res.status(204).json(
            {
                ok: true, 
                message: "Sesion cerrado con exito." 
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                ok: false, 
                error: "Error, contacta con el administrador" 
            }
        );   
    }
};

/**
 * Controlador para recuperar contraseña.
 * Envía un correo para restablecer la contraseña.
 * 
 * @param {Object} req - Solicitud con el email del usuario.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Respuesta JSON con mensaje de éxito o error.
 */
const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Buscar el usuario en la base de datos
        const userData = await getUserByEmailModel(email);
        if (!userData) {
            return res.status(404).json({
                ok: false,
                error: "Email no encontrado."
            });
        }

        // Enviar correo de restablecimiento de contraseña
        await sendPasswordResetEmail(auth, email);

        // Responder al cliente
        return res.status(200).json({
            ok: true,
            message: "Se ha enviado un correo para restablecer la contraseña."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            error: "Error al enviar el correo de recuperación. Asegúrate de que el email sea correcto."
        });
    }
};

module.exports = { 
    register,
    login,
    logout,
    recoverPassword 
};