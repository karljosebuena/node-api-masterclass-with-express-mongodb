const ErrorResponse = require('../utils/errorResponse');
const debug = require('debug')('server:middleware/error');

module.exports = (err, req, res, next) => {
    // Log for console for the developer
    debug(err);
    console.log(err)
    let error = { ...err };
    // Enumerability and ownership of properties
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
    error.message = err.message;

    let message, statusCode;
    message = error.message;
    statusCode = error.statusCode;
    switch (err.name) {
        // Mongoose bad ObjectID
        case 'CastError':
            message = `Bootcamp not found with id of ${err.value}`;
            statusCode = 404;
            break;
        case 'ValidationError':
            message = Object.values(err.errors).map(val => val.message);
            statusCode = 400;
            break;
        case '':
            break;
        case '':
            break;
        default:
            // For err.code === 11000. Means duplicate entry on creating bootcamp
            message = 'Duplicate name entered. Name must be unique.'
            statusCode = 400;
            break;
    }
    error = new ErrorResponse(message, statusCode);
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
}