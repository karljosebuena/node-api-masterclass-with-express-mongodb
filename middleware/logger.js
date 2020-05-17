// @desc Logs request to console
module.exports = (req, res, next) => {
    const { method, protocol, originalUrl } = req;
    console.log(`${method} - ${protocol}//${req.get('host')}${originalUrl}`)
    next();
}