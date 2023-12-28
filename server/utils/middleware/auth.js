const jwt = require('jsonwebtoken');
const { warn } = require('winston');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        warn("Null token request");
        return res.sendStatus(401);
    }

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) {
            warn(`Bad token ${token}`);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
