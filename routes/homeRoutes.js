"use strict"

const router = require("express").Router()
const homeController = require("../controllers/homeController")

router.get("/:category/new", homeController.newThread)
router.post("/:category/create", homeController.createThread, homeController.redirectView)
router.get("/:category", homeController.category)
router.get("/login/login", homeController.showLoginPages)
router.get("/login/courses", homeController.showLoginPage)
router.get("/", homeController.index)

module.exports = router