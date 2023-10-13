const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const accessService = require("../services/access.service")

class AuthenticationController {

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