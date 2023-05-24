const userService = require('../services/user.service')
const ApiError = require('../error/ApiError')

const checkName = (name) => {
    const regex = /\s/
    return name || !name.match(regex)
}

const checkPassword = (password) => {
    return password.length <= 18 && password.length >= 8 && checkName(password)
}

class UserController {
    async registration(req, res, next) {
        try {
            const {firstname, lastname, email, birth_date, gender, phone, password} = req.body
            const userData = {firstname, lastname, email, birth_date, gender, phone}
            let user = ""
            if (!checkPassword(password)) {
                return next(ApiError.badRequest('Неверный формат пароля'))
            } else {
                user = await userService.registration(userData, password)
            }
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const {link} = req.params
            await userService.activate(link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await userService.login(email, password)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.body.refreshToken
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.body.refreshToken
            console.log("refreshToken=" + refreshToken)
            if (!refreshToken) {
                return next(ApiError.unauthorized('Unauthorized'))
            }
            const user = await userService.refresh(refreshToken)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const {id} = req.user
            const users = await userService.getUser(id)
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.user
            const {firstname, lastname, birth_date, gender, phone} = req.body
            const img = req?.files?.img
            const rawProfile = {firstname, lastname, birth_date, gender, phone}
            const profile = await userService.update(id, rawProfile, img)
            return res.json(profile)
        } catch (e) {
            next(e)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const {id} = req.user
            const {password, newPassword} = req.body
            if (password === newPassword) {
                return next(ApiError.badRequest('Passwords are the same'))
            } else if (!newPassword || !checkPassword(newPassword)) {
                return next(ApiError.badRequest('Неверный формат пароля'))
            }
            const user = await userService.updatePassword(id, password, newPassword)
            return res.json(user ? 'Check email' : 'Something went wrong')
        } catch (e) {
            next(e)
        }
    }

    async activatePassword(req, res, next) {
        try {
            const {link} = req.params
            await userService.activatePassword(link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async updateRole(req, res, next) {
        try {
            const {id, role} = req.body
            const profile = await userService.updateRole(id, role)
            return res.json(profile)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const {id} = req.user
            const user = await userService.deleteUser(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async deleteUserBuId(req, res, next) {
        try {
            const {uid} = req.params
            const user = await userService.deleteUser(uid)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
