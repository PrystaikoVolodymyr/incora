const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';// use for send push notifications

const { PORT, MONGO_URL } = require('./congifs/config');
const apiRouter = require('./router/api.router');

_connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    const status = err.status || 400;
    res
        .status(status)
        .json({
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`Port ${PORT} incora is working`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = require('mongoose');
    connection.on('error', (error) => {
        console.log(error);
    });
}
