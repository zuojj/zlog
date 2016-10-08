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
 * <img src="./aa.png" onerror="ZLog.error(event)" />
 * <script src="./test.js" onerror="ZLog.error(event)"><\/script>
 * ```
 *
 * eg2: window.onerror
 * ```
 * window.onerror = window.ZLog.error.bind(window.ZLog);
 * ```
 *
 * eg3: callback inner
 * ```
 * var btn = document.getElementById('#btn_submit')
 * btn.onclick = function() {
 *     try {
 *         // todo
 *     } catch(e) {
 *         ZLog.error(e);
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
 * ZLog.send('https://www.sogou.com/pv.gif, {
 *     type: 'WARN',
 *     msg: 'VALID_IS_NOT_DEFINED'
 * })
 *
 * eg6:
 * ZLog.send({
 *     type: 'WARN',
 *     msg: 'VALID_IS_NOT_DEFINED'
 * }, 0.5)
 *
 * eg7:
 * ZLog.reporter('https://www.xxx.com/pv.gif?a=c&ip=10.10.1.2', function(url) {
 *     console.log(url);
 * });
 */

(function(window, undefined) {
    var zlog;

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
    }



    zlog = window['ZLog'] = window['ZLog'] || {};

    zlog.version = '0.0.2';
    zlog.options = {
        url: 'https://pb.sogou.com/pv.gif',
        debug: false
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
    zlog.error = function(msg, url, line, column, error) {
        var me = this,
            info = {};

        // element.onerror = function(event) {}
        error = error || msg;

        // Error.prototype
        info.m = (error.message || error.description || msg).toString();
        info.s = (error.stack || getStack(3) || '').toString();
        info.f = (url || error.fileName || (error.target || '').src || '').toString();
        info.l = (line || error.lineNumber || 0).toString();
        info.c = column || error.columnNumber || (window.event && window.event.errorCharacter) || 0;

        me.send(info);

        return me.options.debug;
    };

    /**
     * [send 发送错误信息]
     * @param  {String} url       [请求URL，不带参数]
     * @param  {Object} errorInfo [error Object]
     * @param  {Number} sampling  [采样概率]
     * @return {[type]}           [description]
     */
    zlog.send = function(url, errorInfo, sampling) {
        var me = this,
            params = [],
            rand_reporter = function(rand) {
                return Math.random() <= rand;
            };

        if('object' === typeof url) {
            sampling = errorInfo;
            errorInfo = url;
            url = me.options.url;
        }

        errorInfo = 'object' === typeof errorInfo ? errorInfo : {};
        for(var key in errorInfo) {
            if(errorInfo.hasOwnProperty(key)) {
                params.push(key + '=' + window.encodeURIComponent(errorInfo[key]));
            }
        }
        params.push('rand=' + me.getRand());

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

        params.length && rand_reporter(sampling || 1) && me.reporter(url + params.join('&'));
    };

    /**
     * [reporter 上报接口]
     * @param  {String}   src      [上报URL]
     * @param  {Function} callback [上报回调]
     * @return {[type]}            [description]
     */
    zlog.reporter = function(src, callback) {
        var me = this,
            d = "memory_log_" + me.getRand(),
            img = window[d] = new Image();

        img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = null;
            img = window.d = null;

            callback && callback(src);
        };
        img.src = src;
    };

    /**
     * [makeRand 返回随机数，精确到ms级]
     * @return {String} [随机字符串]
     */
    zlog.getRand = function() {
        return (+new Date()) + '.r' + Math.floor(Math.random() * 1000);
    }

    window.onerror = window.ZLog.error.bind(window.ZLog);
})(window);