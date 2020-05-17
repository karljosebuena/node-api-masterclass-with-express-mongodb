const express = require('express');
const router = express.Router();
const {
    getBootCamps,
    getBootCamp,
    postBootCamp,
    putBootCamp,
    deleteBootCamp } = require('../controllers/bootcamps');

router.route('/')
    .get(getBootCamps)
    .post(postBootCamp);
router.route('/:id')
    .get(getBootCamp)
    .put(putBootCamp)
    .delete(deleteBootCamp);

module.exports = router;