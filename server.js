//Install express server
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/userManeger'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/userManeger/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
    console.log(`listinig to port ${PORT}`)
});