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

const fnReaddatabase = ((req, res) => {
    const database = fs.readFileSync("./user.json", "utf-8")
    return database
})

const fnWriteDataBase = (data) => {
    fs.writeFileSync("./user.json", JSON.stringify(data))
}

// get all users
app.get("/user", (req, res) => {
    const user = fnReaddatabase()
    res.json({
        user,
    })
})

// 404 route
app.get("*", (req, res) => {
    const getRoute = req.originalUrl()
    res.json({
        message: `${getRoute} Not FOund`,
    })
})

app.listen(port,() => {
    console.log("App Is Listening To", port);
})