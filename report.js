/**
 *
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-28 16:01:56
 * @version $Id$
 */

(function(window, undefined) {
    /**
     * 旧版的浏览器这个接口只支持三个参数，新版的支持5个
     */
    var ZLOG = window.ZLOG = window.ZLOG || {};
    ZLOG.reporter = function(url, callback) {
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


    ZLOG.logError = function(msg, url, line, column, error) {
        var info = {},
            str = '';

        if(msg != 'Script error' && !url) {
            return true;
        }

        var getStack = function(depth) {
            var _msg, _fun;

            try {
                throw Error("getStack");
            } catch (e) {
                _msg = (e.stack || e.backtrace || e.stacktrace || '').toString();
                arr = _msg.match(/\n/g) || [];

                return arr.length > depth ? _msg : '';
            }

            _fun = arguments.callee || getStack;

            for (_msg = []; _fun && 5 > _msg.length;) {
                _msg.push(_fun.toString());
                try {
                    _fun = _fun.caller;
                } catch (e) {
                    break;
                }
            }

            _msg.splice(0, depth);

            return _msg.join("==");
        };

        error = error || msg;

        info.m = (error.message || error.description || msg).toString();
        info.s = (error.stack || error.backtrace || error.stacktrace || getStack(3) || '').toString();
        info.f = (url || error.fileName || error.sourceURL || (error.target || '').src).toString();
        info.l = (line || line.lineNumber || error.line).toString();
        info.c = column || (window.event && window.event.errorCharacter) || 0;

        var params = [];
        for(var key in info) {
            params.push(key + '=' + window.encodeURIComponent(info[key]));
        }
        alert(params.join('\n'));
        ZLOG.reporter('https://www.sogou.com/c.gif?' + params.join('&'));
    };

    window.onerror = ZLOG.logError;
})(window);