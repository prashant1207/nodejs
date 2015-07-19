//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT = 9600;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    //response.end('It Works!! Path Hit: ' + request.url);
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch (err) {
        console.log("error encountered");
        console.log(err);
    }
}
dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/page1", function (req, res) {
    console.log("page 1 hit");
    var obj = {
        a: "apple",
        b: "ball",
        c: "cat"
    };

    var test = JSON.stringify(obj);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(test);
});

//A sample POST request
dispatcher.onPost("/post1", function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Got Post Data');
});
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

