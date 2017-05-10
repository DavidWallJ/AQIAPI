/**
 * Created by david on 5/10/17.
 */
var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));



app.listen(PORT, function () {
    console.log('Listening on port 3000!')
});