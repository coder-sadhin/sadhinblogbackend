const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports = async (req, res, next) => {

    const authIgnored = ['/register', '/login'].find((e) => req.path.startsWith(e));
    if (authIgnored) return next();
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const tokenData = jwt.verify(token, process.env.App_Secret_Key);
        req.writerData = tokenData;
        accessToken = token.slice(7);
        decodedToken = jwt_decode(accessToken);
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'invalid Token' });
    }
}