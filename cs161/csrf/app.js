// Module Imports
var express = require('express');

// Initialize Express App
var app = express();

app.set('view engine', 'html')

app.listen(3000, function() {
    console.log('Server started successfully, listening at localhost:3000');
})
