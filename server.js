const express = require("express");
const fs = require("fs");

// create an instanse of express
const app = express();
app.use(express.json());
const port = 2001;

app.get("/", (req, res) => {
  let message = "Welcome to TodoList";
  res.json({
    message,
  });
});

const fnReaddatabase = (req, res) => {
  const database = fs.readFileSync("./user.json", "utf-8");
  return JSON.parse(database);
};

const fnWriteDataBase = (data) => {
  fs.writeFileSync("./user.json", JSON.stringify(data));
};

// get all users
app.get("/user", (req, res) => {
  const user = fnReaddatabase();
  res.json({
    user,
  });
});

// get one user
app.get("/user/:userID", (req, res) => {
  const database = fnReaddatabase();
  let { userID } = req.params;
  userID = parseInt(userID);
  const getUser = database?.user?.find((user) => user.id === userID);
  if (!getUser) {
    const data = { message: "User Not FOund" };
    return res.status(404).json(data);
  }
  const data = { message: "Succesfully Gotten User", data: getUser };
  res.status(201).json(data);
});

// post user
app.post("/create", (req, res) => {
  const database = fnReaddatabase();
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Body is Required",
    });
  }
  body.id = database.user.length + 1;
  database.user.push(body);
  fnWriteDataBase(database);
  res.status(200).json({
    message: "User Created",
    data: body,
  });
});

// 404 route
app.get("*", (req, res) => {
  const getRoute = req.originalUrl();
  res.json({
    message: `${getRoute} Not FOund`,
  });
});
app.listen(port, () => {
  console.log("App Is Listening To", port);
});
