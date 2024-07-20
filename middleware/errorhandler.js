const { ResourceNotFound } = require("../Error/error")

const errorHandler = (err, req, res, next) => {
    if(err instanceof ResourceNotFound) {
        return res.status(err.message).json({message: err.message})
    }
    res.status(500).json({message: "Internal Server error"})
}

module.exports = errorHandler