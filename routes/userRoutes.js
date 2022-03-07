"use strict"

const router = require("express").Router()
const userController = require("../controllers/userController")

router.get("/new", userController.new)
router.post(
    "/create",
    userController.validate,
    userController.create,
    userController.redirectView
)

router.get("/login", userController.login)
router.post(
    "/login",
    userController.authenticate
)
router.get("/logout", userController.logout, userController.redirectView)

module.exports = router