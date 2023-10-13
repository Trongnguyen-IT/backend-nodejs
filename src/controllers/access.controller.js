const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const accessService = require("../services/access.service")

class AuthenticationController {
    async handleRefreshToken(req, res, next) {
        const result = await accessService.handleRefreshToken(req.body.refreshToken)

        return new SuccessResponse({
            message: 'Refresh token success!',
            metadata: result
        }).send(res)
    }

    async logout(req, res, next) {
        const result = await accessService.logout(req.keyStore)

        return new SuccessResponse({
            message: 'Logout success!',
            metadata: result
        }).send(res)
    }
    async login(req, res, next) {
        const result = await accessService.login(req.body)

        return new SuccessResponse({
            message: 'Login success!',
            metadata: result
        }).send(res)
    }

    async signUp(req, res, next) {
        const result = await accessService.signUp(req.body)

        return new CREATED({
            message: 'Registered OK!',
            metadata: result
        }).send(res)
    }
}

module.exports = new AuthenticationController()