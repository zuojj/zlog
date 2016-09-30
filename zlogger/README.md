# ZLogger

## REFERENCE
```js
<head>
    <script src="ZLogger.js"></script>
</head>
```

## USE

### window.onerror
```js
window.onerror = ZLogger.error;
```

### img.onerror / script.onerror
```html
<img src="error.png" onerror="ZLogger.error(event)">
or
imgObj.addEventListener('error', ZLogger.error, false);
imgObj.attachEvent('onerror', ZLogger.error);
```

### directly use send
```
ZLogger.send('http://aa.xx.com/pv.gif?', {
    ip: '10.1.1.1'
}, 1);
or
ZLogger.send('http://aa.xx.com/pv.gif?name=benjamin', {
    ip: '10.1.1.1'
}, 0.3);
```

### directly use reporter
```js
ZLogger.reporter('https://www.xxx.com/pv.gif?a=c&ip=10.10.1.2', function(url) {
    console.log(url);
});
```

