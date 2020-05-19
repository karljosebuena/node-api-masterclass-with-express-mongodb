const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const debug = require('debug')('server');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

// LOAD env vars
dotenv.config({ path: './config/config.env' });

// Invoke database connection;
connectDB(colors);

// Set port
const PORT = process.env.PORT || 5000;

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development')
app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Mount error handler
app.use(errorHandler);

// Listen to port
const server = app.listen(PORT, () => {
    debug(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    debug(`Error: ${err.message}`.bgRed.white);
    // close server and exit process
    server.close(() => process.exit(1));
})