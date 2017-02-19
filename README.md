# ZLog

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]

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

