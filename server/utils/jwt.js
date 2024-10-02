const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';

class Jwt {
    static sign(payload) {
        return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRY});
    }

    static verify(token) {
        return jwt.verify(token, JWT_SECRET);
    }
}

module.exports = Jwt;