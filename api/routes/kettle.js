var express = require('express');
var router = express.Router();

var ws = require("nodejs-websocket")
var status = "";

var server = ws.createServer(function (conn) {
    console.log("Kettle Connected")
    conn.on("text", function (message) {
        console.log("Message from Kettle: " + message)
        status = message;
    })
    conn.on("close", function (code, reason) {
        status = "";
        console.log("Kettle Disconnected. Code:" + code + ". Reason:" + reason);
    })
    conn.on("error", function (errObj) {
        status = "";
        console.log("Kettle Disconnected. Error:" + errObj);
    })
}).listen(8001)


router.get('/status', function(req, res, next) {
    
    if(getConnection() == null || status == "")
        return getKettleDisconnectedResponse(res);
    
    res.json(JSON.parse(status));
});

router.post('/on', function(req, res, next) {
 
    var connection = getConnection();
    if(connection == null)
        return getKettleDisconnectedResponse(res);
    
    var message = getKettleCommandMessage(true);
    connection.sendText(JSON.stringify(message));
    
    res.send("Kettle On Command Message Sent");
});

router.post('/off', function(req, res, next) {
    
    var connection = getConnection();
    if(connection == null)
        return getKettleDisconnectedResponse(res);
    
    var message = getKettleCommandMessage(false);
    connection.sendText(JSON.stringify(message));
    
    res.send("Kettle Off Command Message Sent");
});

function getKettleDisconnectedResponse(res) {
    return res.status(503).send("Kettle Disconnected");
}

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
