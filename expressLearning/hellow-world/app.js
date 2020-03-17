var express = require('express');
var app = express();


app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/', function(req, res){
    res.send('this is my first page');
});

app.use(logErrors);
app.use(clientErrorHandler);


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Somethsing broke!');
  });

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error: 'Something blew up!' });
    } else {
        next(err);
    }
}