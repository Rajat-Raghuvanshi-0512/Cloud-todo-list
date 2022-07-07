const express = require("express");
const app = express();
const path = require("path");

//Config path
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "server/Config/config.env" })
}


const user = require("./Routes/userRoutes")
const notes = require("./Routes/notesRoutes")
const cookieParser = require("cookie-parser")
const ErrorHandler = require("./Middleware/error")
const bodyParser = require("body-parser")

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))


//Routes
app.use("/api", user)
app.use("/api", notes)

//For production
app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})


app.use(ErrorHandler)


module.exports = app;