

const authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        req.userId = req.session.userId;
        next();
    } else {
        res.status(401).json({ mensagem: 'Acesso negado. Por favor, faça o login.' });
    }
};

module.exports = authMiddleware;