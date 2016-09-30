/**
 *
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-27 12:21:38
 * @version $Id$
 */

(function(window, undefined) {
    var sg = {},
        screen = window.screen,
        nav = window.navigator,
        localStorage = window.localStorage,
        sessionStorage = window.sessionStorage,
        ua = nav.userAgent,
        hostname = window.location.hostname,
        t = !0,
        f = !1,
        n = null,
        u = void 0,
        arr = ['base', 'json', 'localStorage', 'sessionStorage', 'cookie', 'dom'];

    sg.base = {
        cookieEnabled: nav.cookieEnabled,
        javaEnabled: nav.javaEnabled(),
        colorDepth: screen.colorDepth || 0,
    };

    for(var i = 0, ilen = arr.length; i < ilen; i++) {
        sg[arr[i]] = sg[arr[i]] || {};
    }

    sg.json.parse = function() {};
    sg.json.stringify = function() {};

    sg.localStorage.A = function() {
        if(!sg.localStorage.f) {
            try {
                var input = sg.localStorage.f = document.createElement('input');
                input.type = 'hidden';
                input.style.display = 'none';
                input.addBehavior('#default#userData');
                document.getElementsByTagName('head')[0].appendChild(input);
            }catch(e) {
                return f;
            }
        }
        return t;
    }
    sg.localStorage.set = function(key, value, e) {
        try {
            if(localStorage) {
                localStorage.setItem(key, value);
            }else {
                if(sg.localStorage.A()) {
                    sg.localStorage.f.expires = date.toUTCString();
                    sg.localStorage.f.load(hostname);
                    sg.localStorage.f.setAttribute(key, value);
                    sg.localStorage.f.save(hostname);
                }
            }
        } catch(g) {};
    }

    sg.localStorage.get = function(key) {
        var value ;
        if(localStorage) {
            value = localStorage.getItem(key);
        }else {
            if(sg.localStorage.A()) {
                sg.localStorage.f.load(hostname);
                value = sg.localStorage.f.getAttribute(key);
                sg.localStorage.f.save(hostname);
            }
        }

        return value || n;
    }

    sg.localStorage.remove = function() {
        if(localStorage) {
            localStorage.removeItem(key);
        }else {
            if(sg.localStorage.A()) {
                sg.localStorage.f.load(hostname);
                sg.localStorage.f.removeAttribute(key);
                sg.localStorage.f.save(hostname);
            }
        }
    }

    sg.sessionStorage.set = function(key, value) {
        !!sessionStorage && sessionStorage.setItem(key, value);
    }

    sg.sessionStorage.get = function(key) {
        return !!sessionStorage ? sessionStorage.get(key) : n;
    }

    sg.sessionStorage.remove = function(key) {
        !!sessionStorage && sessionStorage.removeItem(key);
    }

    sg.cookie.set = function(key, value, options) {
        var d = new Date();
        document.cookie = key + '=' + value +
        (options.domain ? ';domain=' + options.domain : '') +
        (options.path ? ';path=' + options.path : '') +
        (d ? ';expires=' + d.toGMTString() : '') +
        (options.secure ? ';secure': '');
    }

    sg.cookie.get = function(key) {
        return (key = RegExp("(^| )" + key + "=([^;]*)(;|$)").exec(document.cookie)) ? key[2] : n;
    }

    sg.dom.getID = function(id) {
        return document.getElementById(id);
    }

    sg.dom.find = function(element, tagName) {
        for(tagName = tagName.toUpperCase(); (element = element.parentNode) && 1 == element.nodeType;) {
            if(element.tagName === tagName) {
                return element;
            }
        }
        return n;
    }


    sg.log = function(a, callback) {
        // 当浏览器回收内存的时候这个请求是发不出去的，
        var img = new Image(),
            d = "memory_log_" + Math.floor(1024 * 1024 * Math.random()).toString(36);

        window[d] = img;
        img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = n;
            img = window.d = n;
            callback && callback(a);
        }
        img.src = a;
    }

    (function() {
        var g;
        function a() {
            console.log('handler');
        }

        document.addEventListener ? g = function() {
            document.removeEventListener("DOMContentLoaded", g, f);
            a()
        } : document.attachEvent && (g = function() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", g), a())
        });

        if(document.addEventListener) {
            document.addEventListener("DOMContentLoaded", g, f);
            window.addEventListener('load', a, f);
        }else if(document.attachEvent) {
            document.attachEvent('onreadystatechange', g);
            window.attachEvent('onload', a);
        }
    })();
})(window);