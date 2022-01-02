const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));

app.use('/', express.static('public'));

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/Streaming Dashboard.htm'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);