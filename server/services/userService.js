const User = require("../models/user");
const Cart = require("../models/cart");
const Token = require("../models/token");
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserDto = require('../dtos/userDto')
const UserProfileDto = require('../dtos/userProfileDto')
const mailService = require('./mailService')
const tokenService = require('./tokenService')


class UserService {
    async registration(userData, password) {
        let user = await User.findOne({email: userData.email})
        if (user) {
            throw ApiError.badRequest("Email is exist")
        }
        const hashPassword = await bcrypt.hash(password, 4)
        const activationLink = uuid.v4()

        user = await User.create({...userData, password: hashPassword, activationLink})
        await mailService.sendActivationMail(userData.email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        console.log("New User: ")
        console.log(userDto)
        const cart = await Cart.create({uid: user._id})
        console.log("New Cart: " + cart)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})
        if (!user) {
            throw ApiError.notFound("User not found")
        }
        await User.findOneAndUpdate({activationLink}, {isActivated: true})
    }

    async login(email, password) {
        let user = await User.findOne({email})
        if (!user) {
            throw ApiError.notFound("User not found")
        }
        const equivalence = await bcrypt.compareSync(password, user.password)
        if (!equivalence) {
            throw ApiError.badRequest('Введен неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        const validateUser = tokenService.validateRefreshToken(refreshToken)
        console.log(validateUser);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!validateUser || !tokenFromDB) {
            throw ApiError.unauthorized('Unauthorized')
        }

        const user = await User.findById(validateUser.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getUser(id) {
        return new UserProfileDto(await User.findById(id))
    }

    async getAll() {
        return User.find()
    }

    async update(id, rawUser) {
        const user = await User.findById(id)
        if (user) {
            rawUser = {
                firstname: rawUser.firstname || user.firstname,
                lastname: rawUser.lastname || user.lastname,
                email: rawUser.email || user.email,
                birth_date: rawUser.birth_date || user.birth_date,
                phone: rawUser.phone || user.phone,
                gender: rawUser.gender || user.gender
            }
        } else {
            throw ApiError.notFound('User not found')
        }
        console.log("Update User")
        console.log(user);
        return User.findOneAndUpdate({_id: id}, rawUser, {upsert: true, new: true})
    }

    async deleteUser(uid) {
        await Cart.findOneAndDelete({uid})
        await Token.findOneAndDelete({uid})
        return User.findOneAndDelete({_id: uid})
    }
}

module.exports = new UserService()