const express = require('express');
const dotenv = require('dotenv');

// Set port
const PORT = process.env.PORT || 5000;

// Route files
const bootcamps = require('./routes/bootcamps');

// LOAD env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);



app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});