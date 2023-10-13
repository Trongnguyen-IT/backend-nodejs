'use strict'

const MULTIPLE_CHOICES = require("../ultils/reasonPhrases")
const MULTI_STATUS = require("../ultils/statusCodes")

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = MULTIPLE_CHOICES.CONFLICT, statusCode = MULTI_STATUS.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = MULTIPLE_CHOICES.FORBIDDEN, statusCode = MULTI_STATUS.FORBIDDEN) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}