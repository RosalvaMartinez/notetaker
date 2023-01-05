const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const { clear } = require("console");
const PORT = 8080;

app.use(express.static('public'));

app.use(express.json());

//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


//GET /api/notes should read the db.json file and 
//return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), function (err, data) {
        //if (err) throw err;
        //console.log(data)
        // const notes = JSON.parse(data)
        //wconsole.log(data)
        //console.log(typeof data)
        res.send(data)
    });
});

//GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//POST /api/notes should receive a new note 
//to save on the request body, 
//add it to the db.json file, 
//and then return the new note to the client. 
//You'll need to find a way to give each note a unique id when it's saved 

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body
    const id = generateUniqueId();
    const item = {
        id,
        title,
        text
    }

    fs.readFile(path.join(__dirname, 'db/db.json'), (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data)
        notes.push(item);
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), (err) => {
            if (err)
                console.log(err)
            else {
                console.log("New note added succesfully")
            }
        });
    });
    res.send(`${title} ${text}`)
});

//DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. 
//To delete a note, you'll need to read all notes from the db.json file, 
//remove the note with the given id property, and 
//then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id
    fs.readFile(path.join(__dirname, 'db/db.json'), (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data)
        const newNotes = notes.filter(note => note.id !== noteID);
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(newNotes), (err) => {
            if (err)
                console.log(err)
            else {
                console.log("note deleted succesfully")
            }
        });
    });
    //res.send()

})

app.listen(PORT, () => {
    console.log(`HEY WE R WORKING ON PORT ${PORT}`)
});