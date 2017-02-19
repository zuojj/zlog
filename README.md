# ZLoger

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]

[npm-badge]: https://img.shields.io/npm/v/zloger.svg
[npm-badge-url]: https://www.npmjs.com/package/zloger
[travis-badge]: https://img.shields.io/travis/zuojj/zloger/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/zuojj/zloger
[coveralls-badge]: https://img.shields.io/coveralls/zuojj/zloger/master.svg
[coveralls-badge-url]: https://coveralls.io/github/zuojj/zloger
[codeclimate-badge]: https://img.shields.io/codeclimate/github/zuojj/zloger.svg
[codeclimate-badge-url]: https://codeclimate.com/github/zuojj/zloger

A front-end log and exception statistical system

## REFERENCE
```js
<head>
    <script src="zloger.js"></script>
</head>
```

## USE

### window.onerror
```js
window.onerror = window.ZLoger.error.bind(window.ZLoger);
```

### img.onerror / script.onerror
```html
<img src="error.png" onerror="ZLoger.error(event)">
or
imgObj.addEventListener('error', ZLoger.error, false);
imgObj.attachEvent('onerror', ZLoger.error);
```

### directly use send
```
ZLoger.send('http://aa.xx.com/pv.gif?', {
    ip: '10.1.1.1'
}, 1);
or
ZLoger.send('http://aa.xx.com/pv.gif?name=benjamin', {
    ip: '10.1.1.1'
}, 0.3);
```

### directly use reporter
```js
ZLoger.reporter('https://www.xxx.com/pv.gif?a=c&ip=10.10.1.2', function(url) {
    console.log(url);
});
```

