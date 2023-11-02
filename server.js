const express = require("express");
const fs = require("fs");
const PORT = 2021;

// create an instance of express
const app = express();
app.use(express.json())

app.get( "/", (req, res)=> {
   res.json( {
       message: "Welcome to first todolist project."
   });
});

const readDatabase = (req, res) =>{
   const database = fs.readFileSync("./user.json")
   return JSON.parse(database);
}

const writeDatabase = (data) => {
    fs.writeFileSync("./user.json", JSON.stringify(data))
}

// GET all user in the database 

app.get("/user", (req, res)=>{
    const user = readDatabase()
   res.json( {
    data: user,
    // size: user.user.length
   })
})

// Get one user
app.get("/user/:id", (req, res)=>{
    const database = readDatabase()
    const userid = parseInt(req.params.id);
    const users= database.user.find(user => user.id ==userid)
    if(users ===0){
        res.status(404).json({
            message: "User not found"
        })
    } else {
        res.status(200).json( {
            data: users
        })
    }
});


 // create new user
 app.post("/users", (req, res)=> {
    const database = readDatabase();
    const newUser = req.body;
    newUser.id = database.user.length + 1;
    database.user.push(newUser);
    writeDatabase(database);
    res.status(200).json ({
        newData: newUser
    });
});


app.put("/users/:id", (req, res)=> {
    const database = readDatabase();
    const newUser = req.body;
    const userid = parseInt(req.params.id)
    const updatedUser = req.body
    const index = database.user.findIndex(( i ) => ( i.id === userid ));
    if ( index !== -1){
        database.user[ index ] = { ...database.user[index], ...updatedUser}
        writeDatabase( database)
        res.status(200).json ({
            data: database.user[ index ]
        });
        } else {
        res.send("wrong id sent" )
    }

});

// delete a user
app.delete("/user/:id", (req, res) => {
    const database = readDatabase();
    const userId = parseInt( req.params.id)
    const index = database.user.find( (i) => (i.id === id))
    if ( !index ){
        res.status(404).json({
            message: `This id: ${userId} does not exist`
        })
    } else {
        deletedUsers = database.user[ index ]
        database.user.splice(index, 1)
        writeDatabase(database);
        res.status(200).json({
            deletedData: deletedUser
        })
    }
});


// set the port 
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
