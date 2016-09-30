# zlog
A front-end log and exception statistical system

## 相关参数
* 代码版本号
* 主机名
* 网页地址
* 网页标题
* 网页停留时长
* 浏览器语言编码
* 浏览器语言设置
* 屏幕分辨率
* 屏幕颜色深度
* 是否支持java
* 是否支持cookie
* flash版本
* 用户唯一ID
* 1*1.gif 图像地址
* 防止gif缓存随机数
* referrer地址


## 统计项
* 访问类型：cookies设置的访客标识码
* 访问频次：多条记录读取某时间段有多少条记录
* 访问来源：从搜索引擎跳转过来的还是直接输入网址
* 访问时间：读取最近的一条记录的时间
* 入口页面：第一条记录的url
* 最后停留页面：最后一条记录的url
* 访问时长：最后一条记录时间 - 第一条记录停留时间
* 地域信息：后台程序可以根据请求头来获得ip
* 浏览器信息： 后台程序可以根据请求头来获取浏览器信息

## 测试用例
* try catch
* throw new Error('@!!');
* script error
* img onerror
* script onerror
* block script error

## 参考链接
* [GlobalEventHandlers.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)
* [Error.prototype.stack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)
* [Google Analytics数据统计的原理](http://www.biaodianfu.com/google-analytics-architecture.html)
* [网站数据统计分析之一：日志收集原理及其实现](https://my.oschina.net/leejun2005/blog/292709)
* [GrowingIO 如何做到不必埋点即可采集到齐全的用户行为点击流数据?](https://www.zhihu.com/question/38000812)
* [JSTracker：前端异常数据采集](http://taobaofed.org/blog/2015/10/28/jstracker-how-to-collect-data/)
* [构建web前端异常监控系统–FdSafe](http://www.aliued.cn/2012/10/27/%E6%9E%84%E5%BB%BAweb%E5%89%8D%E7%AB%AF%E5%BC%82%E5%B8%B8%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F-fdsafe.html)
* [前端代码异常监控](http://div.io/topic/743)
* [前端代码异常日志收集与监控](http://www.cnblogs.com/hustskyking/p/fe-monitor.html)
* [JSTracker：前端异常数据采集](http://taobaofed.org/blog/2015/10/28/jstracker-how-to-collect-data/)
* [JavaScript Error tracking in browsers](https://herringtondarkholme.github.io/2015/11/17/js-tracker/)
* [JS stacktraces. The good, the bad, and the ugly.](http://blog.bugsnag.com/js-stacktraces)
* [Browser compatibility](https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html)
* [stacktrace.js](https://www.stacktracejs.com/)

