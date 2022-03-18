"use strict"

const express = require("express"),
    app = express(),
    router = require("./routes/index"),
    layouts = require("express-ejs-layouts"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    connectFlash = require("express-flash"),
    expressSession = require("express-session"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/keiziban_1")
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

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
)

app.use(express.json())
app.use(cookieParser("secret_passcode"))
app.use(
    expressSession({
        secret: "secret_passcode",
        cookie:{
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(connectFlash())

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated()
    res.locals.currentUser = req.user
    res.locals.flashMessages = req.flash()
    next()
})

app.use("/", router)

const server = app.listen(app.get("port"), () => {
    console.log(`Start http://localhost:${app.get("port")}`);
})