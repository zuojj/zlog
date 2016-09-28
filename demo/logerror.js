/**
 *
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-28 16:21:26
 * @version $Id$
 */

function getStack(c) {
    var b, d;
    try {
        throw Error("getStack");
    } catch (e) {
        if (b = (e.stack || e.backtrace || e.stacktrace).toString(), (b.match(/\n/g) || []).length > c) return b
    }
    d = arguments.callee || getStack;
    for (b = []; d && 5 > b.length;) {
        b.push(d.toString());
        try {
            d = d.caller
        } catch (a) {
            break
        }
    }
    b.splice(0, c);
    return b.join("@@@")
}

function logError(c, b, d, e, a) {
    try {
        var g, h, k = "";
        a = a || c;
        c = (a.message || a.description || c).toString();
        stack = (a.stack || a.backtrace || a.stacktrace || getStack(2)).toString();
        g = a.target || "";
        b = (b || a.fileName || a.sourceURL || g.src).toString();
        e = e || window.event && window.event.errorCharacter;
        d = (d || a.lineNumber || a.line).toString() + (e ? ":" + e : "");
        try {
            localStorage.setItem("test", "test"), localStorage.removeItem("test"), h = new FormData, h.append("test", "test")
        } catch (m) {
            k = "1"
        }
        var f, l = {
            m: c,
            s: stack,
            f: b || "",
            l: d || "",
            u: document.location,
            w: k
        };
        c = "";
        for (f in l) c += f + "=" + encodeURIComponent(l[f]) + "&";
        (new Image).src = "/home/jserror?" + c
    } catch (n) {}
}
window.onerror = logError;