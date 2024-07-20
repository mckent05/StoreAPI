class ResourceNotFound extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

const createNewNotFoundError = (message, statusCode) => {
    return new ResourceNotFound(statusCode, message)
}

module.exports = { createNewNotFoundError, ResourceNotFound }