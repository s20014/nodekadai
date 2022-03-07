"use strict"

const {Schema} = require("mongoose")

const messageSchema = new Schema(
    {
        message: {
            type: String,
            require: true
        },
        userName: {
            type: String,
            require: true
        }
    },
    {timestamps: true}
)

module.exports = messageSchema