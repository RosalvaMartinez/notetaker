const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 8080;


app.use(express.static('public'));

//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//GET /api/notes should read the db.json file and 
//return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), function (err, data) {
        //if (err) throw err;
        //console.log(data)
        res.send(data)
    });
});
  
//POST /api/notes should receive a new note to save on 
//the request body, add it to the db.json file, and then 
//return the new note to the client. You'll need to find a 
//way to give each note a unique id when it's saved 
app.post('/api/notes', (req, res) => {
    const {title,note} = req.body
    res.send(`${title} ${note} `)
});

app.listen(PORT, () => {
    console.log(`HEY WE R WORKING ON PORT ${PORT}`)
});

