const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require("./config/db");
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));
app.use("/players", require("./routes/playerRoutes"));
app.use("/bigBoards", require("./routes/bigBoardRoutes"));


app.listen(port, () => console.log(`Server started on port ${port}`))