    const debug = require('debug')('server:middleware/error')

    module.exports = (err, req, res, next) => {
    // Log for console for the developer
    debug(err.stack.red)

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server error'
    });
}