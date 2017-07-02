import http from 'http';
import url from 'url';
import response from './response';
import path from 'path';
import fs from 'fs';

const express = () => {
  const app = (req, res) => {
    // req: IncomingMessage
    // res: ServerResponse, 为其制定__proto__,绑定一些函数给他
    res.__proto__ = response;
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const method = req.method.toLowerCase();
    req.path = pathname;
    req.query = urlObj.query;
    req.hostname = req.headers['host'].split(':')[0];

    let index = 0;
    const next = (err) => {
      if (index >= app.routes.length){
        return res.send(`can not access ${method} ${pathname}`);
      }
      const route = app.routes[index++];
      if (err) {
        next(err);
      } else {
        if (route.method === 'middleware') {
          console.log('处理中间件');
          route.fn(req, res, next);
        } else {
          if ((route.path === pathname || route.path === '*') && (route.method === method || route.method === 'all')) {
            route.fn(req, res);
          } else {
            next();
          }
        }
      }
    };
    next();
  };

  app.routes = [];

  const methods = ['get', 'post', 'delete', 'put'];
  methods.forEach(method => {
    app[method] = (path, fn) => {
      app.routes.push({method, path, fn});
    }
  });

  app.use = function (fn) {
    app.routes.push({method: 'middleware', fn: fn});
  };

  app.listen = (port, fn) => {
    // http.createServer(app)
    // app是一个会被自动绑定到request事件的函数，称作requestListener
    // 返回一个http.Server的实例
    http.createServer(app).listen(port, fn);
  };

  return app;
};

express.static = function (p) {
  return function (req, res, next) {
    var staticPath = path.join(p, req.path);
    var exists = fs.existsSync(staticPath);
    if (exists) {
      res.sendFile(staticPath);
    } else {
      next();
    }
  }
};

export default express;
