const express = require("express")
const fs = require("fs")

// create an instanse of express
const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.json({
        mess
    })
})