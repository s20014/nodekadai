"use strict"

const mongoose = require('mongoose')
const Thread = require("../models/thread")

module.exports = {
    index: (req, res) => {
        res.render("index")
    },
    category: (req, res) => {
        const category = req.params.category
        res.locals.category = category
        Thread.find({ category: category })
            .then(threads => {
                res.locals.threads = threads
                res.render("category")
            })
    },
    newThread: (req, res) => {
        res.locals.category = req.params.category
        res.render("newThread")
    },
    createThread: (req, res, next) => {
        const params = {
            title: req.body.title,
            category: req.body.category
        }
        Thread.create(params)
            .then(() => {
                console.log("successfully create new thread")
                res.locals.redirect = `/${req.params.category}`
                next()
            })
    },
    redirectView: (req, res, next) => {
        const redirectPath = res.locals.redirect
        if (redirectPath !== undefined) res.redirect(redirectPath)
        else next()
    },
    showLoginPage: (req, res) => {
        res.render("login/courses")
    },
    showLoginPages: (req, res) => {
        res.render("login/login")
    }
}