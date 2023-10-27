const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse JSON data in the request body
app.use(express.json());

// Route for /notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to read all saved notes from db.json
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Route to save a new note to db.json
app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});