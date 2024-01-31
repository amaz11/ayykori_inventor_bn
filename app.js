// packages
const express = require("express");
const limiter = require("./utils/rateLimit")
const { error } = require('./middleware/error')

const app = express();
// Database
require('./db/db')

//MiddeleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter)
app.use('/api/v1/', require('./routes/index'))
app.use('*', (req, res) => {
    res.send({ error: "No routes matched" });
    res.end();
})

// gobal error handler
app.use(error)

module.exports = app;