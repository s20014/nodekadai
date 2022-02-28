"use strict"

const express = require("express"),
    app = express(),
    router = require("./routes/index"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/keiziban")
    .then(() => {console.log("successfully! connect mongoose")})
    .catch(error => {throw error})

app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs")
app.set("token", process.env.TOKEN || "token")

app.use(express.static("public"))
app.use(layouts)
app.use(
    express.urlencoded({
        extended: false
    })
)

app.use("/", router)

const server = app.listen(app.get("port"), () => {
    console.log(`Start http://localhost:${app.get("port")}`);
})