var portal = require('/lib/xp/portal');
var logFileLib = require('/lib/logfile');
var webSocketLib = require('/lib/xp/websocket');

// return current pos, line array, lineCount, eof: boolean
var handlePost = function (req) {
    var action = req.params.action;

    if (action === 'forward' || action === 'backward' || action === 'end' || action === 'seek') {
        return getLines(req, action);
    }

    return {
        status: 400
    };
};

var getLines = function (req, action) {
    var from = req.params.from || '0';
    var lineCount = req.params.lineCount || '0';
    action = action || 'forward';

    var linesResult = logFileLib.getLines({
        lineCount: lineCount,
        from: from,
        action: action
    });

    return {
        contentType: 'application/json',
        body: {
            success: true,
            lines: linesResult.lines,
            size: linesResult.size
        }
    };
};

var handleGet = function (req) {
    if (req.webSocket) {

        return {
            webSocket: {
                data: {},
                subProtocols: ["logbrowser"]
            }
        };
    }

    return {
        status: 204
    };
};

var handleWebSocket = function (event) {
    var sessionId = event.session.id;
    switch (event.type) {
    case 'open':
        //webSocketLib.addToGroup(WS_GROUP_NAME, sessionId);
        break;

    case 'message':
        // handleMessage(event);
        break;

    case 'close':
        //webSocketLib.removeFromGroup(WS_GROUP_NAME, sessionId);
        break;
    }
};

exports.get = handleGet;
exports.post = handlePost;
exports.webSocketEvent = handleWebSocket;
