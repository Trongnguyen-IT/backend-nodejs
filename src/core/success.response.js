'use strict'

const MULTIPLE_CHOICES = require("../ultils/reasonPhrases")
const MULTI_STATUS = require("../ultils/statusCodes")

class SuccessResponse {
    constructor({ message, statusCode = MULTI_STATUS.OK, statusCodeString = MULTIPLE_CHOICES.OK, metadata = {} }) {
        this.message = !message ? statusCodeString : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, statusCode = MULTI_STATUS.CREATED, statusCodeString = MULTIPLE_CHOICES.CREATED, metadata }) {
        super({ message, statusCode, statusCodeString, metadata })
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse
}