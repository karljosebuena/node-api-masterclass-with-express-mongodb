const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const BootCamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await BootCamp.find();
    res.status(200).send({
        success: true,
        msg: 'Show all bootcamps',
        data: bootcamps,
        count: bootcamps.length
    })
})
// @desc    Get bootcamp by id
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const bootcamp = await BootCamp.findById(id);
    if (!bootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    res.status(200).send({
        success: true,
        msg: `Show bootcamp ${req.params.id}`,
        data: bootcamp
    })
})
// @desc    Create/post new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.postBootCamp = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const bootcamp = await BootCamp.create(body);
    res.status(201).send({
        success: true,
        msg: 'Created new bootcamp',
        data: bootcamp
    })
})
// @desc    Update bootcamp by id
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.putBootCamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const bootcamp = await BootCamp.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp)
        return next(new ErrorResponse(`No record found for id ${id}`, 404))
    res.status(200).send({
        success: true,
        msg: `Updated bootcamp ${id}`,
        data: bootcamp
    })
})
// @desc    Delete bootcamp by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const bootcamp = await BootCamp.findByIdAndDelete(id);
    if (!bootcamp)
        return next(new ErrorResponse(`No record found for id ${id}`, 404));
    res.status(200).send({
        success: true,
        msg: `Deleted bootcamp  ${id}`,
        data: bootcamp
    })
})