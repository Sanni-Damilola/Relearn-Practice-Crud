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
    return JSON.parse(database)
})
fnReaddatabase()

const fnWriteDataBase = (data) => {
    fs.writeFileSync("./user.json", JSON.stringify(data))
}

app.listen(port,() => {
    console.log("App Is Listening To", port);
})