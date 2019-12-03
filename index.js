// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error on get /", error);
      res.status(500).json({ errorMessage: "error from get / request" });
    });
});

server.get("/users/:id",(req,res) => {
    let id = req.params.id;
    db.find(id)
        .then(singleUser => {
            res.status(200).json(singleUser);
        })
        .catch(error =>{
            console.log("error from /user/:id", error)
            res.status(404).json({message: "id not found"});
        });
});

server.post("/users",(req,res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((error) => {
        console.log("error from post /users", error);
        res.status(500).json({errorMessage: "error adding user to database"})
    });
});

server.delete("/users/:id", (req,res) => {
    const id = req.params.id;

    db.remove(id)
    .then((removed) => {
        if(removed){
            res.status(200).json({message: "user deleted by id successfully"});
        }else{
            res.status(404).json({ message: "user by this id cannot be found" });
        };
    })
    .catch((errror) => {
        console.log("error on DELETE /users/:id", error);
        res.status(500).json({ errorMessage: "error removing this user "})
    });
});

server.put("/users/:id", (req,res) => {
    const id = req.params.id;
    const update = req.body;
    
    db.update(id, update)
    .then((user) => {
        res.status(200).json(user);
    })
    .catch((error) => {
        console.log("error in put /users/:id", error);
        res.status(404).json({ errorMessage: "error editing this user"});
    });
    
})

const port = 3459;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`)
);

server.get("/:id", (req,res) => {
    db.findById()
    .then(char => {
        res.status(200).json(char);
    })
    .catch(error => {
        console.log("error from get /:id", error);
        res.status()
    })
}
