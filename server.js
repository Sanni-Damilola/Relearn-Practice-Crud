const express = require("express")
const fs = require("fs")

// create an instanse of express
const app = express()
app.use(express.json())
const port = 2001


app.get("/", (req, res) => {
    let myString = "Welcome to TodoList";
let message = myString.charAt(0).toUpperCase() + myString.slice(1).toLowerCase();
    res.json({
        message
    })
})

app.listen(port,() => {
    console.log("App Is Listening To", port);
})