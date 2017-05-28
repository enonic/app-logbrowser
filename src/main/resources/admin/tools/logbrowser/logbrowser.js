var mustache = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');

exports.get = function (req) {
    var view = resolve('./logbrowser.html');

    var svcUrl = portalLib.serviceUrl({service: 'logbrowser'});
    var params = {
        adminUiAssetsUrl: portalLib.assetUrl({path: "", application: "com.enonic.xp.admin.ui"}),
        launcherJsUrl: portalLib.assetUrl({path: "/js/launcher.js", application: "com.enonic.xp.admin.ui"}),
        assetsUri: portalLib.assetUrl({path: ""}),
        svcUrl: svcUrl
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};