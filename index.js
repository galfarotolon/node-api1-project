const express = require('express')
const shortId = require('shortid')

const server = express();



let users = [
    {
        id: 1,
        name: 'test',
        bio: 'web30'

    },
    {
        id: 2,
        name: 'test2',
        bio: 'web30'
    }

]




server.use(express.json()); //how to parse json from the body


server.get('/', (req, res) => {
    res.send('Testing afternoon project');
})

server.get('/api/users', function (req, res) {

    if (users) {

        res.status(200).json(users);

    } else {

        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }

})


server.post('/api/users', function (req, res) {
    const newUser = req.body;

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        try {
            users.push(newUser);

            res.status(201).json(users);
        } catch{

            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }


    }


})

server.get('/api/users/:id', function (req, res) {

    const id = req.params.id;
    const findId = users.find(user => user.id == id)


    if (findId) {
        res.status(200).json(findId);
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }

});




server.delete('/api/users/:id', function (req, res) {
    const id = req.params.id;

    users = users.filter(user => user.id !== Number(id));

    res.status(200).json(users);
});




const port = 5000;

server.listen(port, () => console.log('started on port 5000'))