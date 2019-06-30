var mustache = require('/lib/mustache');
var portalLib = require('/lib/xp/portal');
var adminLib = require('/lib/xp/admin');

exports.get = function (req) {
    var view = resolve('./logbrowser.html');

    var svcUrl = portalLib.serviceUrl({service: 'logbrowser'});
    var params = {
        adminUiAssetsUrl: adminLib.getAssetsUri(),
        assetsUri: portalLib.assetUrl({path: ""}),
        svcUrl: svcUrl
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};