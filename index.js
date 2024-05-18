const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const cors = require('cors')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

const DB_FILE = 'database.json'
// Function to read data from JSON file
   const readDatabase = () => {
     const data = fs.readFileSync(DB_FILE);
     return JSON.parse(data);
   };

console.log(readDatabase())
   // Function to write data to JSON file
   const writeDatabase = (data) => {
     fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
   };

   // Route to get all users
   app.get('/users', (req, res) => {
     const db = readDatabase();
     res.json(db.users);
   });

   // Route to add a new user
   app.post('/users', (req, res) => {
     const db = readDatabase();
     const newUser = req.body;
     db.users.push(newUser)
     writeDatabase(db);
     res.status(201).json(newUser);
   });

   // Route to update a user by id
   app.put('/users/:id', (req, res) => {
     const db = readDatabase();
     const userId = req.params.id;
     const updatedUser = req.body;

     const userIndex = db.users.findIndex(user => user.id === userId);
     if (userIndex === -1) {
       return res.status(404).json({ message: 'User not found' });
     }

     db.users[userIndex] = updatedUser;
     writeDatabase(db);
     res.json(updatedUser);
   });

   // Route to delete a user by id
   app.delete('/users/:id', (req, res) => {
     const db = readDatabase();
     const userId = req.params.id;

     const userIndex = db.users.findIndex(user => user.id === userId);
     if (userIndex === -1) {
       return res.status(404).json({ message: 'User not found' });
     }

     db.users.splice(userIndex, 1);
     writeDatabase(db);
     res.status(204).send();
   });

app.listen(port, () => console.log('Listening...'))