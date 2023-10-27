const express = require('express');
const path = require('path');
const htmlRoutes = express.Router();

// This view route is a GET route for the homepage
htmlRoutes.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// This view route is a GET route for the feedback page
htmlRoutes.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = htmlRoutes;