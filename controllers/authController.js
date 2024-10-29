const { 
    getUserByEmailModel, 
    createUserModel,
    updateUserPasswordByEmailModel 
} = require('../models/authModel');

const bcrypt = require('bcryptjs');

/**
 * Controlador para obtener usuario por email.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmailModel(email);
        if (user) {
            return res.status(200).json(
                { 
                    ok: true, 
                    data: user 
                }
            );
        } else {
            return res.status(404).json(
                { 
                    ok: false, 
                    msg: "Usuario no encontrado" 
                }
            );
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error contacte con el administrador"
        });
    }
};

/**
 * Controlador para crear un nuevo usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await createUserModel(
            { 
                name, 
                email, 
                hashedPassword, 
                role 
            }
        );
        return res.status(201).json(
            { 
                ok: true, 
                msg: "Usuario creado con éxito", 
                data: newUser 
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error contacte con el administrador"
        });
    }
};

/**
 * Controlador para actualizar la contraseña de un usuario por email.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const updateUserPasswordByEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12); 
        const updatedUser = await updateUserPasswordByEmailModel(email, hashedPassword);
        return res.status(200).json(
            { ok: true, 
                msg: "Contraseña actualizada con éxito", 
                data: updatedUser 
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error contacte con el administrador"
        });
    }
};

module.exports = {
    getUserByEmail,
    createUser,
    updateUserPasswordByEmail
};