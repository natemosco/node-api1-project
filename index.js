// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  db.find()
    .then(foobar => {
      res.status(200).json(foobar);
    })
    .catch(err => {
      console.log("error on get /", error);
      res.status(500).json({ errorMessage: "error from get / request" });
    });
});

const port = 345912;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} **\n`);
);
