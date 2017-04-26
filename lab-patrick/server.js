'use strict';

const bodyParser = require('./lib/body-parser');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;



const server = module.exports = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'POST') {
    // curl -H "Content-Type: application/json" -X POST -d '{"text": "moo!"}' http://localhost:3000/cowsay
    if(req.url.pathname === '/cowsay') {
      bodyParser(req, function(err) {
        if(err) console.error(err);
        let message = cowsay.say({text: req.body.text, f: 'turtle'} );
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    }
    else if(req.url.pathname === '/'){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello world');
      res.end();
      return;
    }
    else {
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay'){
      if(!req.url.query.text){
        let message = cowsay.say(
          {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
        );
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      }
      let message = cowsay.say({text: req.url.query.text, f: 'turtle'});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
  if(req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello world');
    res.end();
    return;
  }
});

server.listen(PORT, () => console.log(`Listening on port, ${PORT}`));
