class AuthenticationController {
    constructor() {

    }

    async signUp(req, res, next) {
        try {
            console.log('req.body', req.body);
            return res.status(201).json({
                title: 'HFello world'
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = new AuthenticationController()