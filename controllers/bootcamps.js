// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = (req, res, next) => {
    res.status(200).send({ success: true, msg: 'Show all bootcamps'});
    next();
}
// @desc    Get bootcamp by id
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = (req, res, next) => {
    res.status(200).send({ success: true, msg: `Show bootcamp ${req.params.id}` })
    next();
}
// @desc    Create/post new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.postBootCamp = (req, res, next) => {
    res.status(200).send({ success: true, msg: 'Created new bootcamp' })
    next();
}
// @desc    Update bootcamp by id
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.putBootCamp = (req, res, next) => {
    res.status(200).send({ success: true, msg: `Updated bootcamp ${req.params.id}` })
    next();
}
// @desc    Delete bootcamp by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootCamp = (req, res, next) => {
    res.status(200).send({ success: true, msg: `Deleted bootcamp ${req.params.id}` })
    next();
}