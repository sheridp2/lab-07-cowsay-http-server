# Patrick Sheridan
## Lab-07 Cowsay HTTP Server

### Overview
Create an HTTP server that uses cowsay to have a cow diplay different messages. Also create a body parser for the POST methods.

### How to use
Have a nodemon running the server.js

In a second terminal window run

```
http POST :3000/cowsay text=hello
```
to POST the coe saying hello to the server. Hello can be replaced by whatever you wabt the cow to say.

In the console type
```
http GET :3000/cowsay?text=hello
```
To "preview" what the cow would look like if you POST'ed it.
