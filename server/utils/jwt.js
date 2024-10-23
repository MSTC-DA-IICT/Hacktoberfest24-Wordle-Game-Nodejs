const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';

class Jwt {
    static sign(payload) {
        return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRY});
    }

    static verify(req, res, next) {
        try {
            const token = req.headers.authorization;
            req.user = jwt.verify(token, JWT_SECRET);

            next();
        } catch (error) {
            return res.status(401).json({
                error: {
                    message: 'Invalid or expired token - Please login again'
                }
            });
        }
    }
}

module.exports = Jwt;