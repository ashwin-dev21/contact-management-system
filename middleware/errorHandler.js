const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.status(statusCode).json({
                title: "Validation Error",
                message: err.message,
                stackTrace:err.stack,
            });

        case constants.NOT_FOUND:
            return res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace:err.stack,
            });

        case constants.UNAUTHORIZED:
            return res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace:err.stack,
            });

        case constants.FORBIDDEN:
            return res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace:err.stack,

            });

        case constants.SERVER_ERROR:
            return res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace:err.stack,
            });

        default:
            console.log("ALL OK");
            return res.status(500).json({
                title: "Unknown Error",
                message: "An unexpected error occurred.",
                stackTrace:err.stack,
            });
    }
};

module.exports = errorHandler;