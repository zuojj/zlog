/**
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-28 16:01:56
 * @description onerror arguments table:
 * https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @add
 * ```
 * <!--[if lte IE 6]>
 * <script type="text/javascript">
 *     window.onerror=function(){return true;}
 * <\/script>
 * <![endif]-->
 * ```
 *
 * @example
 * eg1: image or script load error
 * ```
 * <img src="./aa.png" onerror="ZLogger.error(event)" />
 * <script src="./test.js" onerror="ZLogger.error(event)"><\/script>
 * ```
 *
 * eg2: window.onerror
 * ```
 * window.onerror = ZLogger.error;
 * ```
 *
 * eg3: callback inner
 * ```
 * var btn = document.getElementById('#btn_submit')
 * btn.onclick = function() {
 *     try {
 *         // todo
 *     } catch(e) {
 *         ZLogger.error(e);
 *     }
 * }
 * ```
 *
 * eg4: different domain and script inner error
 * ```
 * <script src="./test.js" crossorigin><\/script>
 *
 * // server
 * header('Access-Control-Allow-Origin: *');
 * ```
 *
 * eg5: url have no params
 * ZLogger.send('https://www.sogou.com/pv.gif, {
 *     type: 'WARN',
 *     msg: 'VALID_IS_NOT_DEFINED'
 * })
 *
 * eg6:
 * ZLogger.send({
 *     type: 'WARN',
 *     msg: 'VALID_IS_NOT_DEFINED'
 * }, 0.5)
 *
 * eg7:
 * Zlogger.reporter('https://www.xxx.com/pv.gif?a=c&ip=10.10.1.2', function(url) {
 *     console.log(url);
 * });
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

    zlogger = window['ZLogger'] = window['ZLogger'] || {};

    zlogger.version = '0.0.1';
    zlogger.options = {
        url: 'http://www.sogou.com/a.gif'
    };

    /**
     * [error 日志, 适应window.onerror, img.onerror, script.onerror]
     * @param  {String} msg    [错误信息]
     * @param  {String} url    [出现错误URL]
     * @param  {String} line   [行号]
     * @param  {String} column [列号]
     * @param  {Object} error  [错误详细信息]
     * @return {Undefined}     [description]
     */
    zlogger.error = function(msg, url, line, column, error) {
        var info = {};

        // element.onerror = function(event) {}
        error = error || msg;

        // Error.prototype
        info.m = (error.message || error.description || msg).toString();
        info.s = (error.stack || getStack(3) || '').toString();
        info.f = (url || error.fileName || (error.target || '').src || '').toString();
        info.l = (line || error.lineNumber || 0).toString();
        info.c = column || error.columnNumber || (window.event && window.event.errorCharacter) || 0;

        zlogger.send(info);
    };

    /**
     * [send 发送错误信息]
     * @param  {String} url       [请求URL，不带参数]
     * @param  {Object} errorInfo [error Object]
     * @param  {Number} sampling  [采样概率]
     * @return {[type]}           [description]
     */
    zlogger.send = function(url, errorInfo, sampling) {
        var params = [],
            rand_reporter = function(rand) {
                return Math.random() <= rand;
            };

        if('object' === typeof url) {
            sampling = errorInfo;
            errorInfo = url;
            url = zlogger.options.url;
        }

        errorInfo = 'object' === typeof errorInfo ? errorInfo : {};
        for(var key in errorInfo) {
            if(errorInfo.hasOwnProperty(key)) {
                params.push(key + '=' + window.encodeURIComponent(errorInfo[key]));
            }
        }
        params.push('rand=' + (+new Date()) + '.r' + Math.floor(Math.random() * 1000));

        /**
         * http://www.sogou.com/pv.gif
         * => http://www.sogou.com/pv.gif?
         */
        url = url.indexOf('?') > 0 ? url : (url + '?');

        /**
         * http://www.sogou.com/pv.gif?name=zhansan
         * => http://www.sogou.com/pv.gif?name=zhansan&
         * http://www.sogou.com/pv.gif?name=zhansan&sex=male
         * => http://www.sogou.com/pv.gif?name=zhansan&sex=male&
         */
        url = /\?.+[^&]$/.test(url) ? (url + '&') : url;

        params.length && rand_reporter(sampling || 1) && zlogger.reporter(url + params.join('&'));
    };

    /**
     * [reporter 上报接口]
     * @param  {String}   src      [上报URL]
     * @param  {Function} callback [上报回调]
     * @return {[type]}            [description]
     */
    zlogger.reporter = function(src, callback) {
        var d = "memory_log_" + Math.floor(1024 * 1024 * 1024 * Math.random()).toString(36),
            img = window[d] = new Image();

        img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = null;
            img = window.d = null;

            callback && callback(src);
        };
        img.src = src;
    };

    window.onerror = zlogger.error;
})(window);