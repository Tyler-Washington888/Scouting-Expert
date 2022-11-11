const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require("./config/db");
const colors = require('colors')
const port = process.env.PORT || 5000
const connecDB = require('./config/db')

connecDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));
app.use("/players", require("./routes/playerRoutes"));


app.listen(port, () => console.log(`Server started on port # ${port}`))