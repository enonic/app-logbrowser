var mustache = require('/lib/mustache');
var portalLib = require('/lib/xp/portal');
var assetLib = require('/lib/enonic/asset');
var adminLib = require('/lib/xp/admin');

exports.get = function (req) {
    var view = resolve('./logbrowser.html');

    var svcUrl = portalLib.serviceUrl({service: 'logbrowser'});
    var params = {
        assetsUri: assetLib.assetUrl({path: ""}),
        svcUrl: svcUrl,
        menuLoaderUrl: adminLib.extensionUrl({
            application: 'com.enonic.xp.app.main',
            extension: 'menu-loader',
            params: {
                theme: 'light'
            }
        })
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};