var express = require('express');
var router = express.Router();

var ws = require("nodejs-websocket")
var status = "<no data>";

var server = ws.createServer(function (conn) {
    console.log("Kettle Connected")
    conn.on("text", function (str) {
        status = str;
    })
    conn.on("close", function (code, reason) {
        console.log("Kettle Disconnected")
    })
}).listen(8001)


router.get('/status', function(req, res, next) {
    res.send(status);
});

router.get('/on', function(req, res, next) {
 
    var connection = getConnection();
    if(connection == null)
        return res.send("No kettle connected");
    
    var message = getKettleCommandMessage(true);
    connection.sendText(JSON.stringify(message));
    
    res.send("Kettle On Command Message Sent");
});

router.get('/off', function(req, res, next) {
    
    var connection = getConnection();
    if(connection == null)
        return res.send("No kettle connected");
    
    var message = getKettleCommandMessage(false);
    connection.sendText(JSON.stringify(message));
    
    res.send("Kettle Off Command Message Sent");
});

function getConnection() {
    
    if(server.connections.length == 0)
        return null;
    return server.connections[0];
}

function getKettleCommandMessage(activate) {
    
    var message = {
        Type: 2,
        Data: {
            Activate: activate
        }
    }
    
    return message;
}

module.exports = router;
