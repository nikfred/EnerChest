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
const path = require("path");
const fs = require("fs");
const fileService = require("./fileService");


class UserService {
    async registration(userData, password) {
        let user = await User.findOne({email: userData.email})
        if (user) {
            throw ApiError.badRequest("Email is exist")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()

        user = await User.create({...userData, password: hashPassword, activationLink})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        console.log("New User: ")
        console.log(userDto)
        const cart = await Cart.create({uid: user._id})
        console.log("New Cart: " + cart)

        await mailService.sendActivationMail(userData.email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

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
        const user = await User.findById(id)
        if (!user) {
            throw ApiError.notFound('User not found')
        }
        return new UserProfileDto(user)
    }

    async getAll() {
        return User.find()
    }

    async update(id, rawUser, img = null) {
        let user = await User.findById(id)
        if (user) {
            rawUser = {
                firstname: rawUser.firstname || user.firstname,
                lastname: rawUser.lastname || user.lastname,
                birth_date: rawUser.birth_date || user.birth_date,
                phone: rawUser.phone || user.phone,
                gender: rawUser.gender || user.gender
            }
            if (img) {
                rawUser.imageUrl = await fileService.save(img, 'user')
                user.imageUrl && await fileService.remove(user.imageUrl)
            }
        } else {
            throw ApiError.notFound('User not found')
        }
        console.log("Update User")
        console.log(user);
        user = await User.findOneAndUpdate({_id: id}, rawUser, {upsert: true, new: true})
        return new UserProfileDto(user)
    }

    async updatePassword(id, password, newPassword) {
        const user = await User.findById(id)
        const equivalence = await bcrypt.compareSync(password, user.password)
        if (!equivalence) throw ApiError.badRequest('Введен неверный пароль')
        if (!user.isActivated) throw ApiError.forbidden('Аккаунт не активирован')

        const updateLink = uuid.v4()
        const updateCancel = new Date(+new Date() + 10 * 60 * 1000)
        await mailService.sendUpdatePasswordMail(user.email, `${process.env.API_URL}/api/user/password/${updateLink}`)

        const hash = await bcrypt.hash(newPassword, 5)
        await User.findOneAndUpdate(
            {_id: id},
            {tempPassword: hash, updateLink, updateCancel},
            {upsert: true, new: true}
        )
        return true
    }

    async activatePassword(updateLink) {
        const user = await User.findOne({updateLink})
        if (!user) {
            throw ApiError.notFound("User not found")
        }

        if (+user.updateCancel < +Date.now()) {
            await User.findOneAndUpdate({updateLink}, {tempPassword: null, updateLink: null, updateCancel: null})
            return
        }
        await User.findOneAndUpdate({updateLink}, {
            password: user.tempPassword,
            tempPassword: null,
            updateLink: null,
            updateCancel: null
        })
        return true
    }

    async updateRole(id, role) {
        let user = await User.findById(id)
        if (!user) {
            throw ApiError.notFound('User not found')
        }

        const roles = User.schema.tree.role.enum.values
        if (roles.indexOf(role) === -1) {
            throw ApiError.badRequest('Role not exists')
        }

        user = await User.findOneAndUpdate({_id: id}, {role}, {new: true})
        return new UserProfileDto(user)
    }

    async deleteUser(uid) {
        await Cart.deleteOne({uid})
        await Token.deleteOne({uid})
        const user = await User.findById(uid)
        if (user.imageUrl) {
            fs.unlinkSync(path.resolve(__dirname, "../static", user.imageUrl))
        }
        return User.deleteOne({_id: uid})
    }
}

module.exports = new UserService()