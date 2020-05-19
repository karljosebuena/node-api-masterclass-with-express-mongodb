const debug = require('debug')('server:controller/bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const BootCamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = async (req, res, next) => {
    try {
        const bootcamps = await BootCamp.find();
        res.status(200).send({
            success: true,
            msg: 'Show all bootcamps',
            data: bootcamps,
            count: bootcamps.length
        });
    } catch (error) {
        next(error);
    }
}
// @desc    Get bootcamp by id
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = async (req, res, next) => {
    const { id } = req.params
    try {
        const bootcamp = await BootCamp.findById(id);
        if (!bootcamp)
            return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
        res.status(200).send({
            success: true,
            msg: `Show bootcamp ${req.params.id}`,
            data: bootcamp
        });
    } catch (error) {
        next(error)
    }
}
// @desc    Create/post new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.postBootCamp = async (req, res, next) => {
    try {
        const { body } = req;
        const bootcamp = await BootCamp.create(body);
        res.status(201).send({
            success: true,
            msg: 'Created new bootcamp',
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }
}
// @desc    Update bootcamp by id
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.putBootCamp = async (req, res, next) => {
    try {
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
        });
    } catch (error) {
        next(error);
    }
}
// @desc    Delete bootcamp by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootCamp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bootcamp = await BootCamp.findByIdAndDelete(id);

        if (!bootcamp)
            return next(new ErrorResponse(`No record found for id ${id}`, 404));
        res.status(200).send({
            success: true,
            msg: `Deleted bootcamp  ${id}`,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    };
}