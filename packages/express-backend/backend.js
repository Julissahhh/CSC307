import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Deez",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => {
          return user["name"] === name && user["job"] === job
        }
    );
};

  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job!= undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const id = (Math.round(Math.random()*1000)).toString();
    userToAdd.id = id
    addUser(userToAdd);
    res.status(201).send(userToAdd)
  });

  app.delete("/users/:id", (req, res) => {
    const userToDelete = req.params["id"];
    const deletedUser = DeleteUser(userToDelete);
    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "User not found" });
    }

  });

  const DeleteUser = (userId) => {
    const userIndex = users["users_list"].findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      return users["users_list"].splice(userIndex, 1)[0]; // Removes and returns the user
    }
    return null;
  };

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };


app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});