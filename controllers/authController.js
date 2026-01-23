const authService = require('../services/authService');

const SingIn = async (req, res) => {
    try {
        const myUser = await authService.registerUser(req.body);
        
        res.status(201).json({
            message: 'User registered in successfully',
            user: {
                username: myUser.username,
                email: myUser.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
};

const SingUp = async (req, res) => {
    try {
        // Va nous permettre de récupérer des éléments particulier avec la destructuration
        const { email, password } = req.body;

        // Renvoie le token associé à user
        const { user, token } = await authService.loginUser(email, password);
        
        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { SingIn, SingUp };