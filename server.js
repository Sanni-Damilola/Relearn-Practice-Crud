const express = require("express")
const fs = require("fs")

// create an instanse of express
const app = express()
app.use(express.json())
const port = 2001


app.get("/", (req, res) => {
    let message = "Welcome to TodoList";
    res.json({
        message
    })
})



app.listen(port,() => {
    console.log("App Is Listening To", port);
})