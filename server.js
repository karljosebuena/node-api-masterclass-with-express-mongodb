const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const debug = require('debug')('server.js');

// Set port
const PORT = process.env.PORT || 5000;

// Route files
const bootcamps = require('./routes/bootcamps');

// LOAD env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development')
app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Listen to port
app.listen(PORT, () => {
    debug(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});