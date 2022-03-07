"use strict"

const router = require("express").Router()
const homeRoutes = require("./homeRoutes")
const userRoutes = require("./userRoutes")

router.use("/users", userRoutes)
router.use("/", homeRoutes)

module.exports = router