var mustache = require('/lib/mustache');
var portalLib = require('/lib/xp/portal');

exports.get = function (req) {
    var view = resolve('./logbrowser.html');

    var svcUrl = portalLib.serviceUrl({service: 'logbrowser'});
    var params = {
        assetsUri: portalLib.assetUrl({path: ""}),
        svcUrl: svcUrl
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};