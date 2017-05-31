工资条管理后台前端页面

## 基础依赖

- angular 1.x
- angular-material 1.x
- angular-material-data-table


## 目录结构

- app：源代码
  - service：angular service
  - directives: 指令
  - filters: 过滤器
  - views：一个页面一个文件夹
    - *.ctrl.js：controller
    - *.html controller对应的页面
    - *.scss 样式表
- dest：编译代码后存放位置，源码中不存在
- output：打包文件存放位置，源码中不存在


具体文档可以看[这里](http://olado.github.io/doT/index.html)

## 代理服务器的使用和配置

Browser-Sync集成了http-proxy-middleware，可以将匹配的url请求转发给其他http服务器。
此功能可用于本地调试时访问测试服务器或线上服务器的数据服务。
配置文件为`proxy.config.js`。

urlPattern: 本地http服务的url匹配规则，匹配上的url会被转发给target。
target: 转发的目标http服务

**urlPattern常规使用**

* `'/'` - 匹配所有路径，所有请求都将被转发
* `'/api'` - 匹配以`/api`开始的路径
* `['/api', '/ajax', '/someotherpath']` - 匹配多个路径

**通配符匹配**

* `'**'` - 匹配所有路径，所有请求都将被转发.
* `'**/*.html'` - 匹配以所有`.html`结尾的路径
* `'/*.html'` - 匹配根路径下的以`.html`结尾的路径
* `'/api/**/*.html'` - 匹配以`/api`开始并以`.html`结尾的路径
* `['/api/**', '/ajax/**']` - 匹配多个路径
* `['/api/**', '!**/bad.json']` - 去除特定路径

**自定义**

```javascript
/**
 * @return {Boolean}
 */
var filter = function (pathname, req) {
    return (pathname.match('^/api') && req.method === 'GET');
};

urlPattern = filter;
```

具体文档可以看[这里](https://github.com/chimurai/http-proxy-middleware)

## 提供的命令

- npm run start：启动调试服务器
- npm run build：开发用编译
- npm run release：发布用编译
- npm run clean：清理编译结果
- npm run test：保留用于单元测试
