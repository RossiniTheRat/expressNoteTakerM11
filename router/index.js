const express = require('express');

// Import our files containing our routes
const notesRouter = require('./notes');
const htmlRouter = require('./htmlRoutes');

// Create and instance of express so we can apply the middleware and routing
const app = express();

app.use('/api', notesRouter);
app.use('/', htmlRouter);

module.exports = app;