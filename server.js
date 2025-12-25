const express = require("express");
const app = express();
const router = express.Router();

const users = [
    {
        id: 1,
        username: 'Muhammad Younas',
        age: 20,
    },
    {
        id: 2,
        username: 'Muhammad Siraj',
        age: 18,
    },
    {
        id: 3,
        username : 'Muhammmad Sami',
        age: 21,
    }
]

app.use(express.json());

router.post('/users', (req, res) => {
    const {username, age} = req.body;
    const foundUser = users.find((user) => user.username == username);
    if(foundUser){
        res.status(409).send({message: 'username already exist'});
        return
    }
    const id = users.length + 1;
    users.push({id, username, age});
    res.send({message: "user added successfully"})    
})

router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id == id);
    if(index == -1){
        res.status(404).send({message: `user not found against Id: ${id}`});
        return
    }
    users.splice(index, 1);
    res.send({message: 'user deleted successfully'})
})

router.get('/users', (req, res) => {
    res.send(users);
})

router.get('/', (req, res) => {
    res.send({isSuccess: true, message: "Server is running"})
})

app.use('/', router)

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running at PORT ", PORT)
})