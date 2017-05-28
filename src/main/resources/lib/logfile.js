exports.getLines = function (params) {
    var bean = __.newBean('com.enonic.app.logbrowser.LogFileHandler');
    bean.lineCount = params.lineCount;
    bean.from = params.from;
    bean.action = params.action || 'forward';
    return __.toNativeObject(bean.getLines());
};
