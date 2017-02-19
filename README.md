# ZLog

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]

[npm-badge]: https://img.shields.io/npm/v/zloges.svg
[npm-badge-url]: https://www.npmjs.com/package/zloges
[travis-badge]: https://img.shields.io/travis/zuojj/zlog/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/zuojj/zlog
[coveralls-badge]: https://img.shields.io/coveralls/zuojj/zlog/master.svg
[coveralls-badge-url]: https://coveralls.io/github/zuojj/zlog
[codeclimate-badge]: https://img.shields.io/codeclimate/github/zuojj/zlog.svg
[codeclimate-badge-url]: https://codeclimate.com/github/zuojj/zlog

A front-end log and exception statistical system

## REFERENCE
```js
<head>
    <script src="zlog.js"></script>
</head>
```

## USE

### window.onerror
```js
window.onerror = window.ZLog.error.bind(window.ZLog);
```

### img.onerror / script.onerror
```html
<img src="error.png" onerror="ZLog.error(event)">
or
imgObj.addEventListener('error', ZLog.error, false);
imgObj.attachEvent('onerror', ZLog.error);
```

### directly use send
```
ZLog.send('http://aa.xx.com/pv.gif?', {
    ip: '10.1.1.1'
}, 1);
or
ZLog.send('http://aa.xx.com/pv.gif?name=benjamin', {
    ip: '10.1.1.1'
}, 0.3);
```

### directly use reporter
```js
ZLog.reporter('https://www.xxx.com/pv.gif?a=c&ip=10.10.1.2', function(url) {
    console.log(url);
});
```

