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

// update user
app.put("/update/:userId", (req, res) => {
  const database = fnReaddatabase();
  let { userId } = req.params;
  userId = Number(userId);
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Body is Required",
    });
  }
  const getTheUser = database.user.findIndex((user) => user.id === userId);
  if (getTheUser === -1) {
    return res.status(404).json({
      message: `This ID (${userId}) is not found`,
    });
  }
  database.user[getTheUser] = { ...database.user[getTheUser], ...body };
  fnWriteDataBase(database);
  res.status(201).json({
    message: "User Updated",
  });
});

// delete a user
app.delete("/delete/:id", (req, res) => {
  const database = fnReaddatabase();
  let { id } = req.params;
  id = Number(id);
  const getTheUser = database.user.find((index) => index.id === id);
  if (getTheUser === -1) {
    return res.status(404).json({
      message: `This id: ${userId} does not exist`,
    });
  }
  database.user.splice(getTheUser, 1);
  fnWriteDataBase(database);
  res.status(200).json({
    message: "User Deleted",
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
