'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const StatusCodeString = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Fobidden error'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = StatusCodeString.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = StatusCodeString.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}