const notes = require('express').Router();
const path = require("path");
const fs = require("fs");
const dbFile = path.join(__dirname, "../db/db.json")

notes.get("/notes", (req, res) => {
    fs.readFile(dbFile, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send(data);
    });
  });
  
  notes.get("/notes/:id", (req, res) => {
    fs.readFile(dbFile, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const notes = JSON.parse(data);
      const note = notes.find((note) => note.id === req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    });
  });
  
  notes.post("/notes/", (req, res) => {
    fs.readFile(dbFile, "utf8", (err, response) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }      
      const data = JSON.parse(response);
      const newNote = req.body;
      const uniqueId = data.length.toString();
      newNote.id = uniqueId;
      data.push(newNote);
      fs.writeFile(dbFile, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(newNote);
      });
    });
  });
  
  notes.delete("/notes/:id", (req, res) => {
    fs.readFile(dbFile, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const notes = JSON.parse(data);
      const noteIndex = notes.findIndex((note) => note.id === req.params.id);
      if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found" });
      }
      const deletedNote = notes.splice(noteIndex, 1);
      fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(deletedNote);
      });
    });
  });
  
module.exports = notes;