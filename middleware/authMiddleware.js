const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    // Récupère le token depuis la requête
    const authHeader = req.headers['authorization'];

    // Barear-Token récupère uniquement la partie token 
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // 401 non identifié token manquant
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }
    
    try {
        // Vérifie l'authenticité du token et l'associe à à la requête
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // 403 non authorisation d'accéder à cette url pour X Raison
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};


module.exports = authMiddleware;