'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const StatusCodeString = {
    OK: 'Success',
    CREATED: 'Created'
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, statusCodeString = StatusCodeString.OK, metadata = {} }) {
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
    constructor({ message, statusCode = StatusCode.CREATED, statusCodeString = StatusCodeString.CREATED, metadata }) {
        super({ message, statusCode, statusCodeString, metadata })
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse
}