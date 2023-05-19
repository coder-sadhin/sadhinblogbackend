const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');
const db = require('./Db/db');
require('dotenv').config()
const PORT = process.env.SERVER_PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const writerRoute = require('./Routers/writerRoute/writer_routes')


app.use('/writer/', writerRoute)
// app.use('/admin/', require('./routes/admin_routes/admin_routes'))
// app.use('/vendor/store/', require('./routes/vendor_routes/store_routes/store_routes'))

app.all("*", (req, res) => {
    res.send("NO route found.");
});

app.use(function (err, req, res, next) {
    console.log(err)
    res.send({ status_code: 500, message: "something went wrong", err: err.message ? err.message : '' })
})

app.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
});
