/**
 *
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-28 16:01:56
 * @description 旧版的浏览器这个接口只支持三个参数，新版的支持5个
 * @example
 * ```
 * <img src="./aa.png" onerror="ZLogger.log(event)" />
 * <script src="./test.js" onerror="ZLogger.log(event)"></script>
 * window.onerror 文件引入及绑定
 * ```
 */

(function(window, undefined) {
    var zlogger;

    /**
     * [getStack 读取堆栈信息, 默认3层]
     * @param  {Number} depth [堆栈深度]
     * @return {String}       []
     */
    function getStack(depth) {
        var fun,msg = [];

        fun = arguments.callee.caller;
        while(fun && (--depth) > 0) {
            msg.push(fun.toString());
            try {
                fun = fun.caller;
            } catch (e) {
                break;
            }
        }

        return msg.join(',');
    };

    function print(msg, url, line, column, error) {
        var result = document.getElementById('result');

        result.innerHTML += "Error: " + msg + "<br />"
        result.innerHTML += "Error: " + url + "<br />"
        result.innerHTML += "Error: " + line + "<br />"
        result.innerHTML += "Error: " + column + "<br />"
        result.innerHTML += "Error: " + error + "<br />"
    }

    zlogger = window['ZLogger'] = window['ZLogger'] || {};

    zlogger.options = {
        url: 'https://www.sogou.com/a.gif?'
    };

    /**
     * [log 日志, 适应window.onerror, img.onerror, script.onerror]
     * @param  {String} msg    [错误信息]
     * @param  {String} url    [出现错误URL]
     * @param  {String} line   [行号]
     * @param  {String} column [列号]
     * @param  {Object} error  [错误详细信息]
     * @return {Undefined}     [description]
     */
    zlogger.log = function(msg, url, line, column, error) {
        var info = {},
            str = '',
            params = [];
print(msg, url, line, column, error);
        // element.onerror = function(event) {}
        error = error || msg;

        // Error.prototype
        info.m = (error.message || error.description || msg).toString();
        info.s = (error.stack || getStack(3) || '').toString();
        info.f = (url || error.fileName || (error.target || '').src || '').toString();
        info.l = (line || error.lineNumber || 0).toString();
        info.c = column || error.columnNumber || (window.event && window.event.errorCharacter) || 0;

        for(var key in info) {
            params.push(key + '=' + window.encodeURIComponent(info[key]));
        }
print(params.join('\n'));
        zlogger.reporter(zlogger.options.url + params.join('&'));
    };

    /**
     * [reporter 上报接口]
     * @param  {String}   url      [上报URL]
     * @param  {Function} callback [上报回调]
     * @return {[type]}            [description]
     */
    zlogger.reporter = function(url, callback) {
        // 当浏览器回收内存的时候这个请求是发不出去的，增加缓存
        var img = new Image(),
            d = "memory_log_" + Math.floor(1024 * 1024 * 1024 * Math.random()).toString(36);

        window[d] = img;
        img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = null;
            img = window.d = null;

            callback && callback(url);
        };
        img.src = url;
    };

    window.onerror = zlogger.log;
})(window);