const User = require('../models/userModel');

// Importer bcrypt pour le hachage des mots de passe
const bcrypt = require('bcrypt');

// Importer jsonwebtoken pour la gestion des tokens
const jwt = require('jsonwebtoken');


const registerUser = async (userData) => {
    const { email, password } = userData;

    // Vériffication si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 16);
    return await User.create({
        username: userData.username,
        email: userData.email,
    })
};

const loginUser = async (email, password) => {
    // Vérification en base de données
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    // Vérification du mot de passe
    const isPasswiordValid = await bcrypt.compare(password, user.password);
    if (!isPasswiordValid) {
        throw new Error('Pawword or email is incorrect');
    }

    // Génération du token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { user, token };
}

module.exports = { registerUser, loginUser };