var mustache = require('/lib/mustache');
var portalLib = require('/lib/xp/portal');
var assetLib = require('/lib/enonic/asset');

exports.get = function (req) {
    var view = resolve('./logbrowser.html');

    var svcUrl = portalLib.serviceUrl({service: 'logbrowser'});
    var params = {
        assetsUri: assetLib.assetUrl({path: ""}),
        svcUrl: svcUrl
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};