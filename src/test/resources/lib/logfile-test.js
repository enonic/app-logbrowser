var logfileLib = require('/lib/logfile');
var assert = require('/lib/xp/testing');

exports.testGetLinesWithAllParams = function () {
    var result = logfileLib.getLines({
        lineCount: 10,
        from: 0,
        action: 'forward',
        search: 'error',
        regex: false,
        matchCase: true
    });

    assert.assertNotNull(result);
    assert.assertJsonEquals({size: 0, lines: []}, result);
};

exports.testGetLinesWithMissingOptionalParams = function () {
    var result = logfileLib.getLines({});

    assert.assertNotNull(result);
    assert.assertJsonEquals({size: 0, lines: []}, result);
};
