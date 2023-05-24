const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '7d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(uid, refreshToken) {
        return Token.findOneAndUpdate({uid}, {refreshToken}, {new: true, upsert: true});
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken})
    }

    async findToken(refreshToken) {
        return Token.findOne({refreshToken})
    }
}

module.exports = new TokenService()
